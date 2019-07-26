;;; poco-org-edit.el --- Configuration to edit content.

;;; Commentary:
;;; Code to edit Powercoders content.

;;; Code:

(add-to-list 'load-path default-directory)

(require 'poco-config)
(require 'poco-org-export)

(use-package org-bullets
  :hook (org-mode . org-bullets-mode)
  :config (setq inhibit-compacting-font-caches t) ; Speed up Windows
  :ensure t)

(use-package org-variable-pitch
  :hook (org-mode . org-variable-pitch-minor-mode)
  :ensure t)

(defun poco/enable-visual-line-mode ()
  "Enable visual line mode (for use in a hook)."
  (visual-line-mode 1))

(add-hook 'org-mode-hook #'poco/enable-visual-line-mode)

(setq org-adapt-indentation nil)
(setq org-support-shift-select t)
(setq css-indent-offset 2)
(setq graphviz-dot-indent-width 2)
(setq js-indent-level 2)

;; org-babel: Redisplay inline images after evaluation.
(add-hook 'org-babel-after-execute-hook
          'org-redisplay-inline-images)

;; Easy snippets to make code insertion easier
(require 'org-tempo)
(setq org-structure-template-alist      ; h is already bound, unbind it
      (delq (assoc "h" org-structure-template-alist)
            org-structure-template-alist))
(add-to-list 'org-structure-template-alist
	     '("h" . "src html"))
(add-to-list 'org-structure-template-alist
             '("j" . "src javascript"))
(add-to-list 'org-structure-template-alist
             '("css" . "src css"))

(tempo-define-template "org-src-dot"
                       '("#+begin_src dot :file "
                         (P "Output file: ")
                         ".svg :cmdline -Tsvg -Gstylesheet=../graphvic.css" n
                         "digraph G {" n
                         "  " p n
                         "}" n
                         "#+end_src")
                       "<d"
                       "DOT graph"
                       'org-tempo-tags)

(tempo-define-template "ox-reveal-left"
                       '("#+reveal_html: <div class=\"leftcol\">" n
                         r n
                         "#+reveal_html: </div>")
                       "<left"
                       "Left column"
                       'org-tempo-tags)

(tempo-define-template "ox-reveal-right"
                       '("#+reveal_html: <div class=\"rightcol\">" n
                         r n
                         "#+reveal_html: </div>")
                       "<right"
                       "Right column"
                       'org-tempo-tags)

;; Open .html files (e.g., from hitting C-' on a #+INCLUDE block) in
;; Emacs instead of the default (which opens them in a browser).
(add-to-list 'org-file-apps
	     '("\\.x?html?\\'" . emacs))


;;; SQL

;; SQL mode treats "name" as an ANSI SQL keyword, and highlights it when
;; it's a column in a query.
;;
;; To work around this, write column names in lower case. This code
;; advises the sql-mode highlighter to only look at keywords in upper
;; case.

(require 'sql)

;; If sql-font-lock-keywords-builder was called outside compilation then
;; this advice process would probably work.
;;
;; Keeping it here for the moment in case I want to revisit it, or an
;; official way to do this materialises
;;

;; (defun poco/sql-font-lock-keywords-builder(r)
;;   "Return R converting elements after the second to upper case."
;;   (let ((face (car r))
;; 	(boundaries (cadr r))
;; 	(keywords (cddr r)))
;;     `(,face ,boundaries ,@(mapcar #'upcase keywords))))

;; ;; Remove this advice with:
;; ;; (advice-remove #'sql-font-lock-keywords-builder
;; ;;   #'poco/sql-font-lock-keywords-builder)
;; (advice-add 'sql-font-lock-keywords-builder :filter-args
;;             #'poco/sql-font-lock-keywords-builder)

;; Hack - sql-mode-ansi-font-lock-keywords is a list of lists of
;; regexps and the faces to use. At the time of writing there's an
;; entry for "name" / "number" / "nullable" in the regexp that can be
;; updated to just be "number" / "nullable".
(use-package s
  :ensure t)

(setf (car (car sql-mode-ansi-font-lock-keywords))
      (s-replace "n\\(?:ame\\|u\\(?:llable\\|mber\\)\\))"
                 "nu\\(?:llable\\|mber\\))"
                 (car (car sql-mode-ansi-font-lock-keywords))))

;; Automatically convert SQL keywords to uppercase when typed.
(use-package sqlup-mode
  :ensure t
  :config (add-to-list 'sqlup-blacklist "name"))

;; Automatically indent SQL keywords
(use-package sql-indent
  :ensure t
  :hook (sql-mode . sqlind-minor-mode))


;;; Completion
(use-package company
  :ensure t
  :hook (org-mode . company-mode))

(use-package company-quickhelp
  :ensure t)

;; Company support for built-in org-mode completions.
;; https://emacs.stackexchange.com/questions/21171/company-mode-completion-for-org-keywords

(defun poco/org-keyword-backend (command &optional arg &rest ignored)
  (interactive (list 'interactive))
  (cl-case command
    (interactive (company-begin-backend 'poco/org-keyword-backend))
    (prefix (and (eq major-mode 'org-mode)
                 (cons (company-grab-line "^#\\+\\(\\w*\\)" 1)
                       t)))
    (candidates (mapcar #'upcase
                        (cl-remove-if-not
                         (lambda (c) (string-prefix-p arg c))
                         (pcomplete-completions))))
    (ignore-case t)
    (duplicates t)))

(add-to-list 'company-backends 'poco/org-keyword-backend)

(defun poco/org-src-block-name-backend (command &optional arg &rest ignored)
  "Complete `<<' with the names of defined SRC blocks."
  (interactive (list 'interactive))
  (cl-case command
    (interactive (company-begin-backend 'poco/org-src-block-name-backend))
    (init (require 'org-element))
    (prefix (and (eq major-mode 'org-mode)
		 (eq 'src-block (car (org-element-at-point)))
		 (cons (company-grab-line "^<<\\(\\w*\\)" 1) t)))
    (candidates
     (org-element-map (org-element-parse-buffer) 'src-block
       (lambda (src-block)
	 (let ((name (org-element-property :name src-block)))
	   (when name
	     (propertize
	      name
	      :value (org-element-property :value src-block)
	      :annotation (org-element-property :raw-value (org-element-lineage src-block '(headline)))))))))
    (sorted t)			; Show candidates in same order as doc
    (ignore-case t)
    (duplicates nil)		       ; No need to remove duplicates
    (post-completion		       ; Close the reference with ">>"
     (insert ">>"))
    ;; Show the contents of the block in a doc-buffer. If you have
    ;; company-quickhelp-mode enabled it will show in a popup
    (doc-buffer (company-doc-buffer (get-text-property 0 :value arg)))
    (annotation (format " [%s]" (get-text-property 0 :annotation arg)))))

(add-to-list 'company-backends 'poco/org-src-block-name-backend)

(defun poco/remove-generated-files (&optional bfn)
  "Remove files that generated by the export process.

Optional BFN is the value that should be used instead of the
variable `buffer-file-name' to determine the directory that contains
the files to be removed."
  (interactive)
  ;; Find all #+RESULTS blocks. These are represented as paragraphs
  ;; with a :results property. Check to see if the first child is a
  ;; link -- if it is then this is a link to an automatically generated
  ;; file that can be removed.
  (org-element-map (org-element-parse-buffer) 'paragraph
    (lambda (paragraph)
      (let ((results (org-element-property :results paragraph))
	    (first-child (car (org-element-contents paragraph))))
	(when (and (listp first-child)
		   (eq 'link (car first-child)))
	  (message "Found %s / %S" (org-element-property :path first-child) results))
	(when (and (not (eq results nil)) ; Results block...
		   (listp first-child)	; Containing an element...
		   (eq 'link (car first-child))) ; That is a link...
	  (let ((filepath (f-join (f-dirname (or bfn buffer-file-name)) (org-element-property :path first-child))))
	    (message "Deleting %s" filepath)
	    (when (f-exists? filepath)
	      (message "Removing %s" filepath)
	      (f-delete filepath)))))))
  ;; Remove the files generated from this .org file.
  (dolist (ext '("html" "txt"))
    (let ((filepath (f-swap-ext (or bfn buffer-file-name) ext)))
      (when (f-exists? filepath)
	(message "Removing %s" filepath)
	(f-delete filepath)))))

(defun poco/remove-all-generated-files ()
  "Call poco/remove-generated-files for all .org files."
  (interactive)
  (dolist (filename (poco/presentation-targets))
    (with-temp-buffer
      (message "Removing generated files from %s" filename)
      (insert-file-contents filename)
      (poco/remove-generated-files filename)
      (message "Done with %s" filename))))


(defun poco/find-referenced-images (&optional bfn)
  "Find referenced images that should be added to Git.

Optional BFN is the value that should be used instead of the
variable `buffer-file-name' to determine the directory that contains
the files to be added."
  (interactive)
  (let ((filenames '()))
    (org-element-map (org-element-parse-buffer) 'link
      (lambda (link)
	(let* ((inhibit-message t)
	       (type (org-element-property :type link))
	       (path (org-element-property :path link))
	       (parent (org-element-property :parent link))
	       (results (org-element-property :results parent)))
	(when (and (not results)
		   (string= "file" type))
	  (add-to-list 'filenames (f-join (f-dirname (or bfn buffer-file-name)) path))))))
    filenames))

(defun poco/show-all-referenced-images ()
  "Write a list of references images to the *Messages* buffer."
  (interactive)
  (dolist (filename (poco/presentation-targets))
    (with-temp-buffer
      (insert-file-contents filename)
      (dolist (link (poco/find-referenced-images filename))
	(let ((inhibit-message t))
	  (message "%s" link))))))

(defun poco/git-add-all-referenced-images ()
  "Call `git add' to add all referenced images to Git."
 (interactive)
  (dolist (filename (poco/presentation-targets))
    (with-temp-buffer
      (insert-file-contents filename)
      (dolist (link (poco/find-referenced-images filename))
	(call-process "git" nil 0 nil "add" link)))))

;;; Checks for the file

;; Headings should not end with a '.'
(defun poco/org-check-headings ()
  "Check for problems with headings in the current buffer."
  (interactive)
  (let ((filename (buffer-file-name))
	(problems (org-element-map (org-element-parse-buffer) 'headline
		    (lambda (headline)
		      (let ((title (org-element-property :raw-value headline)))
			(when (s-ends-with? "." title)
			  title))))))
    (when problems
      (with-current-buffer (get-buffer-create "*headline problems*")
	(erase-buffer)
	(org-mode)
	(dolist (title problems)
	  (insert (format "[[file:%s::*%s][%s]]\n" filename title title))))
      (pop-to-buffer "*headline problems*"))))


(defun poco/org-get-requirements-problems ()
  "Return a list of requirements problems with the current file.

Each problem is a list that describes the problem, entries in..."
  (let ((filename (buffer-file-name))
	(seen-topics '())
	(problems '()))
    (org-element-map (org-element-parse-buffer) 'headline
      (lambda (headline)
	(let ((title (org-element-property :raw-value headline))
	      (topics (s-split " " (or (org-element-property :TOPIC headline) "") t))
	      (reqs (s-split " " (or (org-element-property :REQUIREMENTS headline) "") t)))
	  (push topics seen-topics)
	  (dolist (req reqs)
	    (unless (member req topics)
	      ;; This is the format that bui wanted.
	      ;; (push `((id . ,(format "file:%s::*%s" filename title))
	      ;; 	      (title . ,title)
	      ;; 	      (req . ,req)
	      ;; 	      (filename . ,filename)) problems))))))
	      (push `(,filename ,title ,req) problems))))))
    problems))

(defun poco/org-check-requirements ()
  (interactive)
  (let ((problems (poco/org-get-requirements-problems)))
    (if problems
	(progn
	  (with-current-buffer (get-buffer-create "*Requirements Problems*")
	    (erase-buffer)
	    (org-mode)
	    (insert "| Headline | Missing |\n")
	    (insert "|----------|---------|\n")
	    (dolist (p problems)
	      (let ((filename (nth 0 p))
		    (title (nth 1 p))
		    (req (nth 2 p)))
		(insert (format "| [[file:%s::*%s][%s]] | %s |\n"
				filename title title req))))
	    (goto-line 3)
	    (org-table-align))
	  (pop-to-buffer "*Requirements Problems*"))
      (message "No problems detected"))))

;; Tried to use bui for this, but it didn't really work, since it
;; doesn't handle links to the Org files very well.
;;
;; (use-package bui
;;   :ensure t)

;; (bui-define-interface my/org-requirements-problems list
;;   :buffer-name "*Requirements Problems*"
;;   :get-entries-function 'my/org-get-requirements-problems
;;   :format '((title nil 45 t)
;; 	    (req nil 25 t)
;; 	    (filename bui-list-get-file-name 30 t)))

;; (defun my/org-check-requirements ()
;;   (interactive)
;;   (bui-get-display-entries 'my/org-requirements-problems 'list))

;; Org based approach -- create a buffer in org-mode that contains
;; a table with the problems.


;; Refiling headings

;; Org stuff for PoCo
(setq org-refile-allow-creating-parent-nodes (quote confirm))
(setq org-refile-use-outline-path t)
(setq org-outline-path-complete-in-steps nil)

(defun poco/presentation-targets ()
  "Return a list of all .org files in the courseware/ tree."
  ;; 7s for this vs. 31s for f-files
  (directory-files-recursively (f-join poco/repo-root "courseware")
			     "^[^\\.].*\\.org$"))

(setq org-refile-targets
      (quote ((nil :maxlevel . 9)
	      (poco/presentation-targets :maxlevel . 9))))

(setq org-refile-use-cache t)

;; Better completion for "#+" at the start of a line.
;;
;; Current completion shows everything. It should be smarter, and show
;; a) all possible BEGIN_... blocks
;; b) the END_... block for the closest BEGIN_... block (if there is one)
;;
;; This should replace pcomplete/org-mode/file-option.

;; Use as :filter-return advice
(defun poco/filter-org-mode-file-option (completions)
  "Complete against all valid file options."
  (save-match-data
    (let* ((heading-start ((lambda ()
			     (save-excursion
			       (org-back-to-heading)
			       (point)))))
	   (block-type (save-excursion
			 (when (re-search-backward "#\\+BEGIN_\\([^[:space:]]+\\)" heading-start t 1)
			   (match-string 1)))))
      (if block-type
	  (cl-remove-if
	   (lambda (completion)
	     (and (s-starts-with? "END_" completion)
		  (not (string= completion (format "END_%s" block-type)))))
	   completions)
	completions))))

;; Note: Doesn't work, as the Org function pcomplete/org-mode/file-option
;; generates the completions *and* calls pcomplete-here in the same
;; place.
;; (advice-add #'pcomplete/org-mode/file-option :filter-return
;; 	    #'my/filter-org-mode-file-option)

;;; Todo
;;
;; Write a function that checks SRC blocks and ensures that :file
;; parameters are unique.


(easy-menu-define powercoders-menu nil
  "Menu for Powercoders functions."
  '("Powercoders"
    ("Publishing"
     ["Generate slide for this file" org-re-reveal-export-to-html]
     ["Publish all files" (org-publish-all t)])
    ("Cleanup"
     ["Remove generated files" poco/remove-generated-files]
     ["Remove all generated files" poco/remove-all-generated-files])))

(define-key-after (lookup-key org-mode-map [menu-bar])
  [mymenu]
  (cons "Powercoders" powercoders-menu) 'tools)


(provide 'poco-org-edit)
;;; poco-org-edit.el ends here

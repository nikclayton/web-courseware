;; Emacs config file for the slides

(require 'package)
(add-to-list 'package-archives
             '("melpa" . "https://melpa.org/packages/"))

(package-initialize)

;; Bootstrap use-package
(unless (package-installed-p 'use-package)
  (package-refresh-contents)
  (package-install 'use-package))

(use-package f
  :ensure t)

;; Full path to the root of the repository.
(setq my/poco-repo-root
      "c:/Users/Nik Clayton/Powercoders/004.powercoders")

;; Full path to the directory that contains exported files.
(setq my/poco-export-root
      "c:/Users/Nik Clayton/exports")

(require 'org)

;; ox-reveal on Melpa has compatability problems with Org (it's
;; set to an older version). Load the local version to avoid
;; version number problems.
(load-file (f-join my/poco-repo-root "org-reveal/ox-reveal.el"))

(require 'org-id)
;; Properties supported for all entries

(setq org-global-properties nil)
      ;; '(("TOPICS_ALL" . "html css javascript dom")
      ;; 	("REQUIREMENTS_ALL" . "html css javascript dom")))

;; Use Zenburn theme so that the colours of the exported HTML and
;; other SRC blocks are as expected.
(use-package zenburn-theme
  :ensure t
  :config
  (load-theme 'zenburn t))

;; The htmlize package is used to export syntax-highlighed HTML.
(use-package htmlize
  :ensure t)

;; Local version of ox-reveal with our customisations
(add-to-list 'load-path "c:/Users/Nik Clayton/GitHub/org-reveal")

;; Remove default attributes from tables so that styling is done
;; with CSS.
(setq org-html-table-default-attributes ())

(setq org-support-shift-select t)

(setq css-indent-offset 2)
(setq graphviz-dot-indent-width 2)

(setq html-tag-face-alist
      '(("b" . bold)
	("big" . bold)
	("blink" . highlight)
	("cite" . italic)
	("em" . italic)
	("h1" bold)
	("h2" bold-italic)
	("h3" italic)
	("h4" default)
	("h5" default)
	("h6" default)
	("i" . italic)
	("rev" . mode-line)
	("s" . default)
	("small" . default)
	("strong" . bold)
	("title" bold)
	("tt" . default)
	("u" . default)
	("var" . italic)))


;; See https://orgmode.org/worg/org-tutorials/org-publish-html-tutorial.html
(require 'ox-publish)
(setq org-publish-project-alist
      `(("bsl-slides-reveal"
	 :base-directory ,my/poco-repo-root
	 :base-extension "org"
	 :publishing-directory ,(f-join my/poco-export-root "slides")
	 :recursive t
	 :publishing-function org-reveal-publish-to-reveal)
	("bsl-slides-static"
	 :base-directory ,my/poco-repo-root
	 :base-extension "css\\|png\\|svg"
	 :publishing-directory ,(f-join my/poco-export-root "slides")
	 :recursive t
	 :publishing-function org-publish-attachment)
	("bsl-notes-html"
	 :base-directory ,my/poco-repo-root
	 :base-extension "org"
	 :publishing-directory ,(f-join my/poco-export-root "notes")
	 :recursive t
	 :publishing-function org-html-publish-to-html)
	("bsl-notes-static"
	 :base-directory ,my/poco-repo-root
	 :base-extension "css\\|png\\|svg"
	 :publishing-directory ,(f-join my/poco-export-root "notes")
	 :recursive t
	 :publishing-function org-publish-attachment)
	("bsl-org"
	 :base-directory ,my/poco-repo-root
	 :base-extension "org"
	 :publishing-directory ,(f-join my/poco-export-root "org")
	 :recursive t
	 :publishing-function org-org-publish-to-org)
	("bsl-slides" :components ("bsl-slides-reveal" "bsl-slides-static"))
	("bsl-notes" :components ("bsl-notes-html" "bsl-notes-static"))
	("bsl-all" :components ("bsl-slides" "bsl-notes" "bsl-org"))))

;; Render HTML to PNG using Chrome
(use-package ob-html-chrome
  :ensure t)

(setq org-babel-html-chrome-chrome-executable
      "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe")

(setq org-reveal-title-slide
      "<h1 class='title'>%t</h1><h2 class='email'>%e</h2>")

;; (setq org-babel-asciitosvg-asciitosvg-executable
;;       "c:/Users/Nik Clayton/go/bin/a2s.exe")

(use-package org-bullets
  :hook (org-mode . org-bullets-mode)
  ;; Otherwise it's very slow on Windows
  :config (setq inhibit-compacting-font-caches t)
  :ensure t)

;; Graphviz support
(use-package graphviz-dot-mode
  :ensure t)

;; org-babel: Graphviz diagrams.
(add-to-list 'org-src-lang-modes (quote ("dot" . graphviz-dot)))

(org-babel-do-load-languages
 'org-babel-load-languages
 '((dot . t)
   (ditaa .t)
					;(asciitosvg. t)))
   ))

;; org-babel: Redisplay inline images after evaluation.
(add-hook 'org-babel-after-execute-hook
	  'org-redisplay-inline-images)

;; org-babel: No need to confirm execution of dot
(defun my/org-confirm-babel-evaluate (lang body)
  (not (member lang '("dot" "html-chrome" "emacs-lisp")))) ; "asciitosvg"))))
(setq org-confirm-babel-evaluate 'my/org-confirm-babel-evaluate)

;; Easy snippets to make code insertion easier

(add-to-list 'org-structure-template-alist
	     '("h" "#+BEGIN_SRC html
?
#+END_SRC"))
(add-to-list 'org-structure-template-alist
	     '("j" "#+BEGIN_SRC javascript
?
#+END_SRC"))
(add-to-list 'org-structure-template-alist
	     '("d" "#+BEGIN_SRC dot :file ?.svg :cmdline -Tsvg -Gstylesheet=../graphviz.css
digraph G {

}
#+END_SRC"))

(add-to-list 'org-structure-template-alist
	     '("css" "#+BEGIN_SRC css
?
#+END_SRC"))

(add-to-list 'org-structure-template-alist
	     '("left" "#+REVEAL_HTML: <div class=\"leftcol\">
?
#+REVEAL_HTML: </div>"))
(add-to-list 'org-structure-template-alist
	     '("right" "#+REVEAL_HTML: <div class=\"rightcol\">
?
#+REVEAL_HTML: </div>"))

;; Open .html files (e.g., from hitting C-' on a #+INCLUDE block) in
;; Emacs instead of the default (which opens them in a browser).
(add-to-list 'org-file-apps
	     '("\\.x?html?\\'" . emacs))


(use-package company-quickhelp
  :ensure t)

;; Company support for built-in org-mode completions.
;; https://emacs.stackexchange.com/questions/21171/company-mode-completion-for-org-keywords

(defun my/org-keyword-backend (command &optional arg &rest ignored)
  (interactive (list 'interactive))
  (cl-case command
    (interactive (company-begin-backend 'my/org-keyword-backend))
    (prefix (and (eq major-mode 'org-mode)
                 (cons (company-grab-line "^#\\+\\(\\w*\\)" 1)
                       t)))
    (candidates (mapcar #'upcase
                        (cl-remove-if-not
                         (lambda (c) (string-prefix-p arg c))
                         (pcomplete-completions))))
    (ignore-case t)
    (duplicates t)))

(add-to-list 'company-backends 'my/org-keyword-backend)


(defun my/org-src-block-name-backend (command &optional arg &rest ignored)
  "Complete `<<' with the names of defined SRC blocks."
  (interactive (list 'interactive))
  (cl-case command
    (interactive (company-begin-backend 'my/org-src-block-name-backend))
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

(add-to-list 'company-backends 'my/org-src-block-name-backend)

;; Font-awesome characters
(setq org-entities-user
      '(("faWin" "\\faWin" nil "<i class=\"fab fa-windows\"></i>" "=win=" "=win=" "")))

;; Javascript stype
(setq js-indent-level 2)

;;; Checks for the file

;; Headings should not end with a '.'
(defun my/org-check-headings ()
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


(defun my/org-get-requirements-problems ()
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

(defun my/org-check-requirements ()
  (interactive)
  (let ((problems (my/org-get-requirements-problems)))
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

(defun my/poco-presentation-targets ()
  (f-files (f-join my/poco-repo-root "couseware")
	   (lambda (file) (equal (f-ext file) "org")) t))

(setq org-refile-targets
      (quote ((nil :maxlevel . 9)
	      (my/poco-presentation-targets :maxlevel . 9))))

;; Better completion for "#+" at the start of a line.
;;
;; Current completion shows everything. It should be smarter, and show
;; a) all possible BEGIN_... blocks
;; b) the END_... block for the closest BEGIN_... block (if there is one)
;;
;; This should replace pcomplete/org-mode/file-option.

;; Use as :filter-return advice
(defun my/filter-org-mode-file-option (completions)
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

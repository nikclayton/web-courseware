;;; poco-org-export.el --- Configuration to export content.

;;; Commentary:
;;; This file contains code to export Powercoders content as slides and
;;; other formats.
;;;
;;; It does not contain code to configure Emacs for editing the content,
;;; that belongs in poco-editor.el.

;;; Code:

(require 'poco-config)


;;; Ensure that Org is loaded
(require 'package)
(add-to-list 'package-archives
             '("melpa" . "https://melpa.org/packages/"))

(package-initialize)

(unless (package-installed-p 'use-package)
  (package-refresh-contents)
  (package-install 'use-package))

(require 'org)


;;; General dependencies
(use-package f                          ; Path manipulation
  :ensure t)

(use-package ob-html-chrome             ; HTML to PNG
  :ensure t)

(setq org-babel-html-chrome-chrome-executable poco/chrome-path)

(use-package graphviz-dot-mode          ; Graphviz diagrams
  :ensure t)


;;; Temporary fixes

;; ox-reveal on Melpa has compatability problems with Org (it's
;; set to an older version). Load the local version to avoid
;; version number problems.
(load-file (f-join poco/repo-root "org-reveal/ox-reveal.el"))

(require 'org-id)

;; Murhaf's system reports the error:
;; "Symbol's function definition is void: org-strip-quotes" when
;; exporting the files. Suspect an Org version mismatch between our
;; systems. This is a temporary fix until I figure out the real
;; problem.
(defun org-strip-quotes (string)
  "Strip double quotes from around STRING, if applicable.
If STRING is nil, return nil."
  (org-unbracket-string "\"" "\"" string))

;; Properties supported for all entries

(setq org-global-properties nil)
      ;; '(("TOPICS_ALL" . "html css javascript dom")
      ;; 	("REQUIREMENTS_ALL" . "html css javascript dom")))



;;; Configure org-babel

(add-to-list 'org-src-lang-modes (quote ("dot" . graphviz-dot)))

(org-babel-do-load-languages
 'org-babel-load-languages '((dot . t)))

;; No need to confirm execution of dot
(defun poco/org-confirm-babel-evaluate (lang body)
  "Determine whether LANG needs confirmation to execute BODY."
  (not (member lang '("dot" "html-chrome" "emacs-lisp"))))
(setq org-confirm-babel-evaluate 'poco/org-confirm-babel-evaluate)

(defun poco/org-babel-current-result-hash ()
  "Alter org-babel caching behaviour.

If you have `:cache yes' set the cached result is used even if
the file doesn't exist.  Fix this by advising the function that
computes the hash of the current content, and check to see if
the file is present."
  (save-excursion
    ;; Find the results block, and go to the first non-whitespace
    ;; content on the following line.
    (let ((results-point (org-babel-where-is-src-block-result)))
      (when results-point
	(goto-char results-point)
	(forward-line)
	(skip-chars-forward " ")
	;; If the context is a link to a local file check to see if the
	;; file exists. If it does proceed to org-babel-current-result-hash
	;; as normal, if it doesn't return nil, and force the file to be
	;; generated.
	(let ((ctx (org-element-context)))
	  (if (and ctx (listp ctx) (eq 'link (car ctx)) (string= "file" (org-element-property :type ctx)))
	      (f-exists? (f-join (f-dirname buffer-file-name) (org-element-property :path ctx)))
	    t))))))

(advice-add #'org-babel-current-result-hash
	    :before-while
	    #'poco/org-babel-current-result-hash)


;;; Look and feel of exported content.
;; Use Zenburn theme so that the colours of the exported HTML and
;; other SRC blocks are as expected.
(use-package zenburn-theme
  :ensure t
  :config
  (load-theme 'zenburn t))

;; The htmlize package is used to export syntax-highlighed HTML.
(use-package htmlize
  :ensure t)

;; Remove default attributes from tables so that styling is done
;; with CSS.
(setq org-html-table-default-attributes ())

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

;; Font-awesome characters
(setq org-entities-user
      '(("faWin" "\\faWin" nil "<i class=\"fab fa-windows\"></i>" "=win=" "=win=" "")))


;;; Publishing

;; See https://orgmode.org/worg/org-tutorials/org-publish-html-tutorial.html
(require 'ox-publish)
(setq org-publish-project-alist
      `(("bsl-slides-reveal"
	 :base-directory ,poco/repo-root
	 :base-extension "org"
	 :publishing-directory ,(f-join poco/export-root "slides")
	 :recursive t
	 :publishing-function org-reveal-publish-to-reveal)
	("bsl-slides-static"
	 :base-directory ,poco/repo-root
	 :base-extension "css\\|png\\|svg"
	 :publishing-directory ,(f-join poco/export-root "slides")
	 :recursive t
	 :publishing-function org-publish-attachment)
	("bsl-notes-html"
	 :base-directory ,poco/repo-root
	 :base-extension "org"
	 :publishing-directory ,(f-join poco/export-root "notes")
	 :recursive t
	 :publishing-function org-html-publish-to-html)
	("bsl-notes-static"
	 :base-directory ,poco/repo-root
	 :base-extension "css\\|png\\|svg"
	 :publishing-directory ,(f-join poco/export-root "notes")
	 :recursive t
	 :publishing-function org-publish-attachment)
	("bsl-org"
	 :base-directory ,poco/repo-root
	 :base-extension "org"
	 :publishing-directory ,(f-join poco/export-root "org")
	 :recursive t
	 :publishing-function org-org-publish-to-org)
	("bsl-slides" :components ("bsl-slides-reveal" "bsl-slides-static"))
	("bsl-notes" :components ("bsl-notes-html" "bsl-notes-static"))
	("bsl-all" :components ("bsl-slides" "bsl-notes" "bsl-org"))))



(provide 'poco-org-export)
;;; poco-org-export.el ends here

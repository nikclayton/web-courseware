;; Emacs config file for the slides

;; TODO: Load Org

(setq org-support-shift-select t)

(setq css-indent-offset 2)
(setq graphviz-dot-indent-width 2)


;; Render HTML to PNG using Chrome
(use-package ob-html-chrome
  :ensure t
  :config
  (setq org-babel-html-chrome-chrome-executable
	"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"))

;; Graphviz support
(use-package graphviz-dot-mode
  :ensure t)

;; org-babel: Graphviz diagrams.
(add-to-list 'org-src-lang-modes (quote ("dot" . graphviz-dot)))

(org-babel-do-load-languages
 'org-babel-load-languages
 '((dot . t)))

;; org-babel: Redisplay inline images after evaluation.
(add-hook 'org-babel-after-execute-hook
	  'org-redisplay-inline-images)

;; org-babel: No need to confirm execution of dot
(defun my/org-confirm-babel-evaluate (lang body)
  (not (member lang '("dot" "html-chrome"))))
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

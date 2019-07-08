;;; poco-package --- Packages for the content publishing system.

;;; Commentary:
;;; This file loads the minimum packages required for the content
;;; publishing system.

;;; Code:

(if (file-exists-p "/.dockerenv")
    (progn
      (require 'cask "~/.cask/cask.el")
      (cask-initialize "/root"))
  (require 'package)
  (add-to-list 'package-archives
 	       '("org" . "https://orgmode.org/elpa/") t)
  (add-to-list 'package-archives
               '("melpa" . "https://melpa.org/packages/"))
  (package-initialize)
  (unless (package-installed-p 'use-package)
    (package-refresh-contents)
    (package-install 'use-package))
  (add-to-list 'load-path
	       "c:/users/nik clayton/github/org-mode/lisp")
  (require 'org))

(provide 'poco-package)
;;; poco-package.el ends here

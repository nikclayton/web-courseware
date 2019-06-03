;;; poco-package --- Packages for the content publishing system.

;;; Commentary:
;;; This file loads the minimum packages required for the content
;;; publishing system.

;;; Code:

(require 'package)

(add-to-list 'package-archives
	     '("org" . "https://orgmode.org/elpa/") t)
(add-to-list 'package-archives
             '("melpa" . "https://melpa.org/packages/"))

(package-initialize)

(unless (package-installed-p 'use-package)
  (package-refresh-contents)
  (package-install 'use-package))

(use-package org
  :ensure t)

(provide 'poco-package)
;;; poco-package.el ends here

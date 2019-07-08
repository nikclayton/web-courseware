;;; poco-config --- Configuration variables for the content publishing system.

;;; Commentary:
;;; This file sets values for variables used in the Powercoders content
;;; publishing system.

;;; Code:
(defvar poco/repo-root
  "c:/users/nik clayton/powercoders/004.powercoders"
  "Full path to the root of the repository.")

(defvar poco/export-root
  "c:/users/nik clayton/exports.new"
  "Full path to the directory to place exported files.")

(defvar poco/chrome-path
  "c:/program files (x86)/google/chrome/application/chrome.exe"
  "Full path, including file, to the Chrome executable.")

;; These settings are for when running in the Docker environment,
;; do not change them.
(when (file-exists-p "/.dockerenv")
  (setq poco/repo-root "/repo")
  (setq poco/export-root "/root/export")
  (setq poco/chrome-path "/usr/bin/chromium-browser"))

(provide 'poco-config)
;;; poco-config.el ends here

-- 002_alter_users_add_created_at.sql
-- Adds `created_at` column to `users` if it does not exist
-- This uses MySQL 8.0+ syntax `ADD COLUMN IF NOT EXISTS`.
-- Run with: mysql -u <user> -p <database> < migrations/002_alter_users_add_created_at.sql

ALTER TABLE `users`
  ADD COLUMN IF NOT EXISTS `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

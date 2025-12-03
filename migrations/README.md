Migration files for DSE API

Files:
- `001_create_tables.sql` — Creates `users` and `items` tables. The `users` table includes `created_at`.
- `002_alter_users_add_created_at.sql` — Adds `created_at` to `users` if missing (uses `ADD COLUMN IF NOT EXISTS`, MySQL 8+).

Quick run (PowerShell / cmd):

1) Apply create tables migration:

```powershell
mysql -u root -p dse_backend < migrations/001_create_tables.sql
```

2) If you already have a `users` table missing `created_at`, run:

```powershell
mysql -u root -p dse_backend < migrations/002_alter_users_add_created_at.sql
```

Notes:
- Replace `root` and `dse_backend` with your DB user and database name.
- `002_alter_users_add_created_at.sql` uses `ADD COLUMN IF NOT EXISTS`, available in MySQL 8.0+. If you run an older MySQL version, use the alternative approach:

```sql
SET @exists = (
  SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'created_at'
);
SELECT IF(@exists = 0, 'will_add', 'already_exists') INTO @s;
-- then run ALTER TABLE only if @exists = 0
```

If you want, I can generate an alternative ALTER script compatible with older MySQL versions.

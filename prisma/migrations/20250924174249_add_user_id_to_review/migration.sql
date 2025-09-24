-- First, add the column as nullable
ALTER TABLE "public"."Review" ADD COLUMN "userId" TEXT;

-- Get first user ID (or delete all reviews if no users exist)
DO $$ 
DECLARE
  first_user_id TEXT;
BEGIN
  SELECT id INTO first_user_id FROM "public"."user" LIMIT 1;
  
  IF first_user_id IS NULL THEN
    -- No users exist, delete all reviews
    DELETE FROM "public"."Review";
  ELSE
    -- Update all reviews with the first user ID
    UPDATE "public"."Review" SET "userId" = first_user_id;
  END IF;
END $$;

-- Now make the column NOT NULL
ALTER TABLE "public"."Review" ALTER COLUMN "userId" SET NOT NULL;

-- Add the foreign key constraint
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_userId_fkey" 
  FOREIGN KEY ("userId") REFERENCES "public"."user"("id") 
  ON DELETE CASCADE ON UPDATE CASCADE;

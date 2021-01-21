SELECT * FROM "public"."LeafRecord" WHERE "LeafRecord"."importedTreeId" = 1;
SELECT SUM(attempts) FROM "public"."LeafRecord" WHERE "LeafRecord"."importedTreeId" = 1;
SELECT "LeafRecord"."isApple" FROM "public"."LeafRecord" WHERE "LeafRecord"."importedTreeId" = 1 AND "LeafRecord"."isApple" = FALSE AND hits ;

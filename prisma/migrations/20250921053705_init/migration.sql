-- CreateTable
CREATE TABLE "public"."Review" (
    "id" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "star" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

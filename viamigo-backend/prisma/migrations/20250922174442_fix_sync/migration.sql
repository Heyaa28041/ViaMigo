-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "preferences" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "country" TEXT NOT NULL,
    "avgCost" DOUBLE PRECISION,
    "tags" TEXT[],
    "lat" DOUBLE PRECISION,
    "lon" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isFemaleOnly" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Itinerary" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "destinationId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserGroups" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_UserGroups_AB_unique" ON "_UserGroups"("A", "B");

-- CreateIndex
CREATE INDEX "_UserGroups_B_index" ON "_UserGroups"("B");

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGroups" ADD CONSTRAINT "_UserGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGroups" ADD CONSTRAINT "_UserGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

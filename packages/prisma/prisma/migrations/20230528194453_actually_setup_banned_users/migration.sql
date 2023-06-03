-- CreateTable
CREATE TABLE "_guildBanned" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_guildBanned_AB_unique" ON "_guildBanned"("A", "B");

-- CreateIndex
CREATE INDEX "_guildBanned_B_index" ON "_guildBanned"("B");

-- AddForeignKey
ALTER TABLE "_guildBanned" ADD CONSTRAINT "_guildBanned_A_fkey" FOREIGN KEY ("A") REFERENCES "auth_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_guildBanned" ADD CONSTRAINT "_guildBanned_B_fkey" FOREIGN KEY ("B") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

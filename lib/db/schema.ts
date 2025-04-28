import {
  pgTable,
  integer,
  uuid,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const files = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey(),

  // file information
  name: text("name").notNull(),
  path: text("path").notNull(),
  size: integer("size").notNull(),
  type: text("type").notNull(),

  // storage information
  fileUrl: text("fileUrl").notNull(),
  thumbnailUrl: text("thumbnailUrl"),

  userId: text("user_id").notNull(),
  parentId: text("parent_id").notNull(),

  isFolder: boolean("is_Folder").default(false).notNull(),
  isFavourite: boolean("is_Favourite").default(false).notNull(),
  isTrash: boolean("is_Trash").default(false).notNull(),

  // timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

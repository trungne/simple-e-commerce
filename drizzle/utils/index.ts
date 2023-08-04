import { sql } from 'drizzle-orm';
import { text } from 'drizzle-orm/pg-core';

export const buildIdColumn = (prefix: string) => {
  return text('id')
    .default(sql.raw(`(CONCAT('${prefix}_', gen_random_uuid()))`))
    .primaryKey();
};

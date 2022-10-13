db.items_full.updateMany(
   {},
   [{ "$set": { "date_completed": { "$toDate": "$date_completed" } }}]
 );
import { database } from "firebase";

export const getFromDatabase = (dbString, callback) => {
  const ref = database().ref(dbString);
  console.log(ref.toJSON());
  ref.on("value", snapshot => {
    if (snapshot.val()) {
      callback(snapshot.val());
    }
  });
};

export const saveToDatabase = (dbString, val) => {
  database()
    .ref(dbString)
    .set(val);
};

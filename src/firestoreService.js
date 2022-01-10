import firebase from "./config";

const db = firebase.firestore();

export const addContainer = (contData) => {
  return db.collection("containers").add({
    ...contData,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
export const editContainer = (id, contData) => {
  return db
    .collection("containers")
    .doc(id)
    .set({
      ...contData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

export const getContainers = () => {
  return db.collection("containers");
};

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
}
export const listenToRecordFromFirestore = (contId) => {
  return db.collection("containers").doc(contId);
};

export const listenLastHmotaVal = () => {
  return db.collection("hmotaLastVal").doc("lastVal");
};

export const setLastHmotaVal = async (val) => {
  const snapshot = await listenLastHmotaVal().get();
  const { lastVal } = snapshot.data();

  const newArr = [...lastVal];

  newArr.unshift(val);
  newArr.pop();

  return await db
    .collection("hmotaLastVal")
    .doc("lastVal")

    .update({ lastVal: newArr });
};

export const deleteContainer = async (id) => {
  return await db.collection("containers").doc(id).delete();
};

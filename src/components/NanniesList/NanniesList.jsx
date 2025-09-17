import { database } from "../../services/firebase.js";
import { ref, get } from "firebase/database";
import { useEffect, useState } from "react";
import NannyItem from "../NannyItem/NannyItem.jsx";

export default function NanniesList() {
  const [nannies, setNannies] = useState([]);

  useEffect(() => {
    const fetchNannies = async () => {
      const dbRef = ref(database, "nannies");
      const result = await get(dbRef);
      if (result.exists()) {
        setNannies(Object.values(result.val()));
      } else {
        console.log("No data available");
      }
    };

    fetchNannies();
  }, []);

  return (
    <div>
      {nannies.map((nanny, index) => (
        <NannyItem key={index} nanny={nanny} />
      ))}
    </div>
  );
}

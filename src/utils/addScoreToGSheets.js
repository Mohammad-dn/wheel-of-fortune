import { GoogleSpreadsheet } from "google-spreadsheet";

export const addScoreToGSheets = async (index) => {
  if (
    process.env.REACT_APP_GOOGLE_CLIENT_EMAIL &&
    process.env.REACT_APP_GOOGLE_PRIVATE_KEY &&
    process.env.REACT_APP_SPREADSHEET_ID
  ) {
    try {
      const doc = new GoogleSpreadsheet(process.env.REACT_APP_SPREADSHEET_ID);
      await doc.useServiceAccountAuth(
        {
          client_email: process.env.REACT_APP_GOOGLE_CLIENT_EMAIL,
          private_key: process.env.REACT_APP_GOOGLE_PRIVATE_KEY,
        },
        (err) => {
          if (err) console.log(err);
          console.log("Working");
        }
      );
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];
      console.log("Sheedsdt", sheet);
      await sheet.addRow({
        web_client: "kushdaga pwa",
        timestamp: Date.now(),
        spin_result_index: index,
      });
      window.location.reload();
    } catch (err) {
      console.log("Errror", err);
      fetch(process.env.REACT_APP_SHEETSU_URL, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          web_client: "kushdaga pwa",
          timestamp: Date.now(),
          spin_result_index: index,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          console.log("Response", json);
          // window.location.reload();
        });
    }
  } else {
    alert("Env variables not set");
  }

  //   console.log(sheet);
};

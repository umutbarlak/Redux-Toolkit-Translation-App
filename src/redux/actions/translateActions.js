import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { languagesOptions } from "../../constans";

export const getLanguages = createAsyncThunk(
  "language/getLanguages",
  async () => {
    const res = await axios.request(languagesOptions);

    return res.data.data.languages;
  }
);

export const translateText = createAsyncThunk(
  "translate/translateText",
  async ({ sourceLang, targetLang, text }) => {
    console.log(sourceLang, targetLang, text);
    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", sourceLang.value);
    encodedParams.set("target_language", targetLang.value);
    encodedParams.set("text", text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "792b6880efmsh80358c12cfc0dcep1e0ceajsn34f1a902dffd",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };

    const res = await axios.request(options);

    return res.data.data.translatedText;
  }
);

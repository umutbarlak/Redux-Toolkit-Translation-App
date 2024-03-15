import { useEffect, useMemo, useState } from "react";
import { getLanguages, translateText } from "./redux/actions/translateActions";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { changText, clearTextArea } from "./redux/slices/translateSlice";
import Loader from "./components/Loader";

const App = () => {
  const langState = useSelector((store) => store.languageReducer);
  const translateState = useSelector((store) => store.translateReducer);

  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });

  const [text, setText] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const formatted = useMemo(
    () =>
      langState.languages.map((i) => ({
        value: i.code,
        label: i.name,
      })),
    [langState.languages]
  );

  const handleChange = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    setText(translateState.text);
    dispatch(changText(text));
  };

  return (
    <div className=" bg-zinc-900 min-h-screen text-white grid place-items-center">
      <div className="w-[80vw] max-w-[1000px] flex flex-col justify-center ">
        <h1 className="text-4xl text-center fw-semibold mb-7">Çeviri +</h1>

        <div className="flex gap-2 text-black">
          <Select
            value={sourceLang}
            isLoading={langState.isLoading}
            isDisabled={langState.isLoading}
            onChange={setSourceLang}
            className="flex-1 text-black "
            options={formatted}
          />

          <button
            onClick={() => handleChange()}
            className=" px-6 py-2  rounded  bg-zinc-700 text-white transition hover:ring-1 hover:bg-zinc-800"
          >
            Değiş
          </button>

          <Select
            value={targetLang}
            isLoading={langState.isLoading}
            isDisabled={langState.isLoading}
            onChange={setTargetLang}
            className="flex-1 text-black "
            options={formatted}
          />
        </div>

        <div className=" flex mt-5 gap-[105px] max-md:flex-col max-md:gap-3 ">
          <div className="flex-1 text-black ">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[250px] max-h-[500px] p-[10px] text-[20px] rounded"
            />
          </div>
          <div className="flex-1 text-white relative">
            <textarea
              value={translateState.text}
              disabled
              className="w-full min-h-[250px] max-h-[500px] p-[10px] text-[20px] rounded "
            />
            {translateState.isLoading && <Loader />}
          </div>
        </div>

        <button
          onClick={() => {
            dispatch(clearTextArea());
            dispatch(translateText({ sourceLang, targetLang, text }));
          }}
          className="rounded-md px-6 py-3 text-xl  semibold cursor-pointer bg-zinc-700 mt-3 hover:ring-2 hover:bg-zing-900 transition w-2/5 hover:bg-zinc-800  mx-auto"
        >
          Çevir
        </button>
      </div>
    </div>
  );
};

export default App;

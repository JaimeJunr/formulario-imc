import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import "./App.scss";

function App() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [imcData, setImcData] = useState({
    imcValue: "",
    imcMessage: "Insira os dados",
  });

  useEffect(() => {
    const { imcValue, imcMessage } = calculateImc(weight, height);
    setImcData({ imcValue, imcMessage });
  }, [weight, height]);

  function calculateImc(weight: number, height: number) {
    if (weight > 0 && height > 0) {
      const imcValue = weight / height ** 2;
      const imcMessage = getImcText(imcValue);
      return { imcValue: imcValue.toFixed(2), imcMessage };
    } else {
      return { imcValue: "", imcMessage: "Insira os dados" };
    }
  }

  function getImcText(imcValue: number) {
    if (imcValue <= 18.5) return "MAGREZA";
    else if (imcValue <= 24.9) return "NORMAL";
    else if (imcValue <= 29.9) return "SOBREPESO";
    else return "OBESIDADE";
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement>,
    setter: Dispatch<SetStateAction<number>>
  ) {
    setter(parseFloat(event.target.value));
  }

  return (
    <>
      <h1>{imcData.imcMessage}</h1>
      <h1>{imcData.imcValue}</h1>
      <form>
        <div>
          <label htmlFor="iptWeigt">Peso</label>
          <input
            min={0}
            autoFocus
            step={0.1}
            type="number"
            id="iptWeigt"
            onChange={(event) => handleInputChange(event, setWeight)}
            onBlur={(event) => handleInputChange(event, setWeight)}
            aria-label="Peso"
          />
        </div>
        <div>
          <label htmlFor="iptHeigt">Altura</label>
          <input
            min={0}
            step={0.01}
            type="number"
            id="iptHeigt"
            onChange={(event) => handleInputChange(event, setHeight)}
            onBlur={(event) => handleInputChange(event, setHeight)}
            aria-label="Altura"
          />
        </div>
      </form>
    </>
  );
}

export default App;

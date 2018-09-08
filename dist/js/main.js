//init speech synt API
var synth = window.speechSynthesis;
// dom elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

//init the voices array
let voices = [];
const getVoices = () => {
  voices = synth.getVoices();
  // loop the voices
  voices.forEach(voice => {
    // create option
    var option = document.createElement("option");
    //fill the option with voice and lang
    option.textContent = voice.name + "(" + voice.lang + ")";
    //set attributes
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};
getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}
// prounounce

const speak = () => {
  // if speaking
  if (synth.speaking) {
    console.error(" it s already speaking!!");
    return;
  }
  if (textInput.valeue !== "") {
    //add back animation
    body.style.background = " #141414 url(img/wave.gif)";
    body.style.backgroundRepeat = "repeat-x";
    body.style.backgroundSize = "100% 100%";
    // get speak text
    const speaktext = new SpeechSynthesisUtterance(textInput.value);
    // speaak end
    speaktext.onend = e => {
      console.log("done speaking !!");
      body.style.background = "white";
    };

    //speak error
    speaktext.onerror = e => {
      console.error("sth worng");
    };

    // selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );

    // loop voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speaktext.voice = voice;
      }
    });
    //set pictch and rate
    speaktext.rate = rate.value;
    speaktext.pitch = pitch.value;
    //speak
    synth.speak(speaktext);
  }
};

// event listeners
// text form submt
textForm.addEventListener("submit", e => {
  e.preventDefault();
  speak();
  textInput.blur();
});
// rate value change
rate.addEventListener("change", e => (rateValue.textContent = rate.value));
pitch.addEventListener("change", e => (pitchValue.textContent = pitch.value));

// voice select change
voiceSelect.addEventListener("change", e => speak());

const cutDescription = (textTitle, lenTag, overview) => {
  const len = textTitle.length;
  let textLength = 135;
  if (len >= 36 && lenTag > 3) {
    textLength = 30;
  } else if (len >= 36 && lenTag <= 3) {
    textLength = 80;
  } else if ((len < 36 && len > 18 && lenTag > 3) || (len >= 18 && lenTag > 3)) {
    textLength = 95;
  } else if ((len < 36 && len > 18 && lenTag <= 3) || (len > 18 && lenTag > 3)) {
    textLength = 110;
  } else if (len <= 18 && lenTag > 3) {
    textLength = 125;
  }

  return `${overview.slice(0, overview.indexOf(' ', textLength))}${overview.length > textLength && '...'}`;
};

export default cutDescription;

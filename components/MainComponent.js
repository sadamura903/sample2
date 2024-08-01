// components/MainComponent.js
"use client";
import React from "react";

function MainComponent() {
  const [spellChars, setSpellChars] = React.useState([]);
  const [inputtedChars, setInputtedChars] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState(null);
  const [userPosition, setUserPosition] = React.useState(null);
  const [allUsers, setAllUsers] = React.useState([]);

  React.useEffect(() => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomSpell = Array.from(
      { length: 8 },
      () => alphabet[Math.floor(Math.random() * alphabet.length)]
    );
    setSpellChars(randomSpell);
    const newUser = `User${Math.floor(Math.random() * 10) + 1}`;
    setCurrentUser(newUser);
    const newPosition = Math.floor(Math.random() * 8);
    setUserPosition(newPosition);

    const generatedUsers = Array.from({ length: 8 }, (_, i) =>
      i === newPosition ? newUser : `User${Math.floor(Math.random() * 10) + 1}`
    );
    setAllUsers(generatedUsers);
  }, []);

  const handleCharInput = (index, char) => {
    if (index !== userPosition) return;
    if (/^[A-Za-z]$/.test(char) || char === "") {
      setInputtedChars((prev) => ({
        ...prev,
        [index]: char
          ? { char: char.toUpperCase(), user: currentUser }
          : undefined,
      }));
    }
  };

  const isInputDisabled = (index) => {
    return index !== userPosition;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-purple-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-purple-800">めざめのじゅもん</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <p className="text-lg mb-4 text-center">今日のじゅもん：</p>
        <div className="flex justify-center flex-wrap gap-2 mb-6">
          {spellChars.map((char, index) => (
            <div key={index} className="flex flex-col items-center">
              <input
                type="text"
                maxLength="1"
                value={inputtedChars[index]?.char || ""}
                onChange={(e) => handleCharInput(index, e.target.value)}
                className={`w-10 h-10 border-2 rounded text-center text-xl font-bold ${
                  isInputDisabled(index)
                    ? "border-gray-300 bg-gray-100 text-gray-500"
                    : "border-purple-300"
                }`}
                disabled={isInputDisabled(index)}
                name={`char-${index}`}
              />
              <span className="text-xs mt-1 text-gray-600">{allUsers[index]}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 text-center">あなたのユーザー: {currentUser}</p>
        <p className="text-sm text-gray-600 text-center mt-2">
          あなたの入力位置: {userPosition !== null ? userPosition + 1 : "なし"}
        </p>
        <p className="text-xs text-gray-500 mt-4 text-center">
          協力して呪文を完成させましょう！自分の担当する文字の位置のみ入力が可能です。アルファベット1文字のみ入力可能です。自身が入力した文字のみ消せます。
        </p>
      </div>
    </div>
  );
}

export default MainComponent;

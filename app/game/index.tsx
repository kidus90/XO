import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Link } from "expo-router";

export default function Index() {
  const XO = [2,7,6,9,5,1,4,3,8];
  const [layout, setLayout] = useState(["", "", "", "", "", "", "", "", ""]);
  const [color, setColor] = useState(["lightblue", "lightblue", "lightblue", "lightblue", "lightblue", "lightblue", "lightblue", "lightblue", "lightblue"]);
  const [Player, setPlayer] = useState(true); // true = X, false = O
  const [PlayerX, setPlayerX] = useState<number[]>([]);
  const [PlayerO, setPlayerO] = useState<number[]>([]);
  const [PlayerXScore, setPlayerXScore] = useState(0);
  const [PlayerOScore, setPlayerOScore] = useState(0);

  const NumberRows = 3;
  const NumberColumns = 3;

  const winningchecker = (player: number[]) => {
    for (let i = 0; i < player.length; i++) {
      for (let j = 0; j < player.length; j++) {
        for (let k = 0; k < player.length; k++) {
          if (i !== j && j !== k && i !== k && player[i] + player[j] + player[k] === 15) {
            setColor(prev => {
              const updated = [...prev];
              const indices = [XO.indexOf(player[i]), XO.indexOf(player[j]), XO.indexOf(player[k])];
              indices.forEach(idx => {
                updated[idx] = "lightgreen";
              });
              alert(`Player ${Player ? "X" : "O"} wins! (${player[i]}, ${player[j]}, ${player[k]})`);
              return updated;
            });
            return true;
          }
        }
      }
    }
    return false;
  };

  const handlePress = (xoValue: number, index: number) => {
    if (PlayerX.includes(xoValue) || PlayerO.includes(xoValue)) {
      alert("This cell is already occupied. Please choose another one.");
      return;
    }

    if (Player) {
      setPlayerX(prev => {
        const updated = [...prev, xoValue];
        winningchecker(updated) ? setPlayerXScore(prevScore => prevScore + 1) : null;
        console.log("PlayerX:", updated);
        return updated;
      });
    } else {
      setPlayerO(prev => {
        const updated = [...prev, xoValue];
        winningchecker(updated) ? setPlayerOScore(prevScore => prevScore + 1) : null;
        console.log("PlayerO:", updated);
        return updated;
      });
    }

    const newLayout = [...layout];
    newLayout[index] = Player ? "X" : "O";
    setLayout(newLayout);

    setPlayer(!Player);
  };

  const resetGame = () => {
    setColor(["lightblue", "lightblue", "lightblue", "lightblue", "lightblue", "lightblue", "lightblue", "lightblue", "lightblue"]);
    setLayout(["", "", "", "", "", "", "", "", ""]);
    setPlayerX([]);
    setPlayerO([]);
    setPlayer(true);
  };

  const frontend = () => {
    const rows = [];
    for (let i = 0; i < NumberRows; i++) {
      const columns = [];
      for (let j = 0; j < NumberColumns; j++) {
        const index = i * NumberColumns + j;
        columns.push(
          <View key={index} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => handlePress(XO[index], index)}
              style={{ width: 100, height: 100, backgroundColor: color[index], margin: 5, justifyContent: "center", alignItems: "center" }}
            >
              <Text style={{ fontSize: 24 }}>{layout[index]}</Text>
            </TouchableOpacity>
          </View>
        );
      }
      rows.push(<View key={i} style={{ flexDirection: "row" }}>{columns}</View>);
    }
    return <View>{rows}</View>;
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: "#00c3ff" }}>
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#00c3ff", justifyContent: "center" }}>
      <Link href="/" style={{ position: "absolute", top: 20, left: 0, fontSize: 18, color: "white" }}>
        Back
      </Link>
      <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%", marginBottom: 20, padding: 10, backgroundColor: "lightgray", borderRadius: 5}}>
        <View style={{ alignItems: "center"}}>
          <Text>Player 1</Text>
          <Text>Win: {PlayerXScore}</Text>
        </View>
        <View style={{ alignItems: "center", marginLeft: 30, marginRight: 30}}>  
          <Text>Player 2</Text>
          <Text>Win: {PlayerOScore}</Text>
          </View>
      </View>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Tic Tac Toe</Text>
      <View>{frontend()}</View>
      <Text style={{ marginTop: 20, fontSize: 28 }}>Player {Player ? "X" : "O"}'s turn</Text>
      <TouchableOpacity onPress={resetGame} style={{ marginTop: 20, padding: 10, backgroundColor: "lightcoral", borderRadius: 5 }}>
        <Text style={{ color: "white", fontSize: 18 }}>Reset Game</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}
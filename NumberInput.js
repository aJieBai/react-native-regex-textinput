import React from "react";

import { TextInput } from "react-native";
import { useState } from "react";

const NumberInput = (props) => {
  const {onChangeText,value,regex,maxLength,...r} = props;
  const [selection, setSelection] = useState({
    start: value?.length || 0,
    end: value?.length || 0
  });

  return (
    <TextInput
      onSelectionChange={e => {
        setSelection(e.nativeEvent.selection);
      }}
      maxLength={value.length}
      onKeyPress={e => {
        const key = e.nativeEvent.key;
        console.log(selection);
        //删除键
        if (key === "Backspace") {
          //通过光标位置来截取字符串  !!!!!长按删除键光标会跳跃到最开始但位置，导致无法正确删除，出现闪烁
          // let s = value.substring(0, selection.start - 1) + value.substring(selection.end);
          // console.log(s);
          // onChangeText(String(s));
        } else if (!maxLength || maxLength > value.length) {
          if (regex && !key.match(regex)) {
            return;
          }
          onChangeText(value + key);
        }
      }}
      onChangeText={text => {
        //在这里处理删除字符串功能，触发并且text与value的值不一致时，就是进行了删除操作，因为直接修改value不会触发onChangeText
        if (text != value) {
          onChangeText(text);
        }
      }}
      value={value}
      {...r}
    />
  );
}

export default NumberInput;

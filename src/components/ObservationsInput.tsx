import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Text,
  TextInput,
  View,
} from "react-native";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import styles from "../styles/inspection-styles";

export interface ObservationInputRef {
  blur: () => void;
}

interface ObservationInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  expanded: boolean;
  currentText?:string;
}

const ObservationInput = forwardRef<
  ObservationInputRef,
  ObservationInputProps
>(
  (
    {
      value,
      onChangeText,
      onFocus,
      onBlur,
      expanded,
      currentText
    },
    ref
  ) => {
    const inputRef = useRef<TextInput>(null);
    const [height, setHeight] = useState(38);

    useImperativeHandle(ref, () => ({
      blur: () => {
        inputRef.current?.blur();
      },
    }));

    return (
      <View style={styles.inputboxContainer}>
        <Text style={styles.inputboxContainerViewTitle}>
          Observaciones:
        </Text>

        <View
          style={[
            styles.inputboxContainerView,
            expanded && {
              flex: 1,
              alignItems: "flex-start",
            },
          ]}
        >
          <View style={styles.inputboxContainerViewLogo}>
            <FontAwesome6
              name="award"
              size={20}
              color="#2563EB"
              iconStyle="solid"
            />
          </View>

          <TextInput
            ref={inputRef}            
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={onChangeText}
            onContentSizeChange={(event) => {
              setHeight(
                Math.max(
                  38,
                  event.nativeEvent.contentSize.height
                )
              );
            }}
            placeholder={currentText ? currentText : "Escribe las observaciones..."}
            style={[
              styles.inputboxContainerViewDesc,
              {
                height,
                textAlignVertical: "top",
              },
            ]}
          />
        </View>
      </View>
    );
  }
);

export default ObservationInput;
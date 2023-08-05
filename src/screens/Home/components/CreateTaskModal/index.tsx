import React, { useRef } from "react";
import { Text } from "@/components/ui/Text";
import { ScrollView } from "react-native";

import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
  useScrollHandlers,
} from "react-native-actions-sheet";
import { ButtonsContainer, SheetViewContainer } from "./styles";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Box } from "@/components/wrappers/Box";
import api from "@/lib/api";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import { useState } from "react";

export function CreateTaskModal({
  sheetId,
  payload,
}: SheetProps<{ data: string }>) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>("1", actionSheetRef);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");

  async function handleCreateTask() {
    setIsLoading(false);
    try {
      console.log(description);
      const {
        data: { message },
      } = await api.post("/task/save", {
        description,
      });

      Toast.show({
        type: "success",
        text1: message,
      });

      SheetManager.hide("create-sheet");

      payload?.onCreate();
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.message || "Error ao salvar task.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ActionSheet
      id={sheetId}
      ref={actionSheetRef}
      onBeforeShow={() => {
        console.log("sheet payload", payload?.data);
      }}
      containerStyle={{
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
      initialSnapIndex={0}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}
      defaultOverlayOpacity={0.7}
    >
      <SheetViewContainer>
        <Text size="MD" weight="bold" align="center">
          Criar nova tarefa
        </Text>

        <Box marginTop={34} marginBottom={20}>
          <Input
            value={description}
            onChangeText={(value) => setDescription(value)}
            placeholder="Descrição"
          />
        </Box>
        <ButtonsContainer>
          <Button
            background="GRAY_100"
            wFull
            onPress={() => SheetManager.hide("create-sheet")}
          >
            <Text color="GRAY_700" weight="bold" fontFamily="secondary">
              Cancelar
            </Text>
          </Button>
          <Button background="GREEN_300" wFull onPress={handleCreateTask}>
            <Text color="WHITE" weight="bold" fontFamily="secondary">
              Criar
            </Text>
          </Button>
        </ButtonsContainer>
      </SheetViewContainer>
    </ActionSheet>
  );
}

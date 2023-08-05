import React, { useRef } from "react";
import { Text } from "@/components/ui/Text";
import { ScrollView } from "react-native";

import ActionSheet, {
  ActionSheetRef,
  SheetProps,
  useScrollHandlers,
} from "react-native-actions-sheet";
import { ButtonsContainer, SheetViewContainer } from "./styles";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Box } from "@/components/wrappers/Box";
import { useState, useEffect } from "react";
import { SheetManager } from "react-native-actions-sheet";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import api from "@/lib/api";

export function EditTaskModal({
  sheetId,
  payload,
}: SheetProps<{ data: string }>) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>("1", actionSheetRef);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState(
    payload?.item?.description || ""
  );

  async function handleEditTask() {
    try {
      console.log(description);
      const {
        data: { message },
      } = await api.patch("/task/edit/" + payload.item.id, {
        description,
      });

      Toast.show({
        type: "success",
        text1: message,
      });

      SheetManager.hide("edit-sheet");

      payload?.onEdit();
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
          Editar tarefa
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
            onPress={() => SheetManager.hide("edit-sheet")}
          >
            <Text color="GRAY_700" weight="bold" fontFamily="secondary">
              Cancelar
            </Text>
          </Button>
          <Button background="GREEN_300" wFull onPress={handleEditTask}>
            <Text color="WHITE" weight="bold" fontFamily="secondary">
              Salvar
            </Text>
          </Button>
        </ButtonsContainer>
      </SheetViewContainer>
    </ActionSheet>
  );
}

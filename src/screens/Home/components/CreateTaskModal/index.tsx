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

export function CreateTaskModal({
  sheetId,
  payload,
}: SheetProps<{ data: string }>) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>("1", actionSheetRef);
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
          <Input placeholder="Descrição" />
        </Box>
        <ButtonsContainer>
          <Button background="GRAY_100" wFull>
            <Text color="GRAY_700" weight="bold" fontFamily="secondary">
              Cancelar
            </Text>
          </Button>
          <Button background="GREEN_300" wFull>
            <Text color="WHITE" weight="bold" fontFamily="secondary">
              Criar
            </Text>
          </Button>
        </ButtonsContainer>
      </SheetViewContainer>
    </ActionSheet>
  );
}

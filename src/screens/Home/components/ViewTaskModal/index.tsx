import { Text } from "@/components/ui/Text";
import { ViewTaskModalContainer, ViewTaskModalContent } from "./styles";
import { Box } from "@/components/wrappers/Box";
import { Button } from "@/components/ui/Button";

interface ViewTaskModalProps {
  onClose: () => void;
}

export function ViewTaskModal({ onClose }: ViewTaskModalProps) {
  function handleBackToHome() {
    onClose();
  }
  return (
    <ViewTaskModalContainer>
      <ViewTaskModalContent>
        <Box marginBottom={18}>
          <Text size="MD" color="GRAY_600" fontFamily="secondary" weight="bold">
            Descrição
          </Text>

          <Text
            size="SM"
            color="GRAY_500"
            fontFamily="secondary"
            weight="medium"
          >
            Tarefa 2
          </Text>
        </Box>

        <Box marginBottom={18}>
          <Text size="MD" color="GRAY_600" fontFamily="secondary" weight="bold">
            Id
          </Text>
          <Text
            size="SM"
            color="GRAY_500"
            fontFamily="secondary"
            weight="medium"
          >
            asdfadsfasdfads
          </Text>
        </Box>

        <Box marginBottom={18}>
          <Text size="MD" color="GRAY_600" fontFamily="secondary" weight="bold">
            Data de criação
          </Text>
          <Text
            size="SM"
            color="GRAY_500"
            fontFamily="secondary"
            weight="medium"
          >
            17/03/2021
          </Text>
        </Box>

        <Box marginBottom={18}>
          <Text size="MD" color="GRAY_600" fontFamily="secondary" weight="bold">
            Última atualização
          </Text>
          <Text
            size="SM"
            color="GRAY_500"
            fontFamily="secondary"
            weight="medium"
          >
            17/03/2021
          </Text>
        </Box>

        <Box marginBottom={18}>
          <Text size="MD" color="GRAY_600" fontFamily="secondary" weight="bold">
            Status
          </Text>
          <Text
            size="SM"
            color="GRAY_500"
            fontFamily="secondary"
            weight="medium"
          >
            A fazer
          </Text>
        </Box>
        <Box marginTop={30} marginLeft={50} marginRight={50}>
          <Button background="GREEN_300" onPress={handleBackToHome}>
            <Text fontFamily="secondary" weight="bold" color="WHITE">
              Voltar para home
            </Text>
          </Button>
        </Box>
      </ViewTaskModalContent>
    </ViewTaskModalContainer>
  );
}

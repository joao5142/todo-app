import { useState } from "react";
import { DotsButtonContainer, DotsIcon, MenuItemContainer } from "./styles";
import { Menu, MenuItem } from "react-native-material-menu";

import { Image, StyleSheet } from "react-native";
import { Text } from "@/components/ui/Text";

import deleteImg from "@assets/images/delete.png";
import editImg from "@assets/images/edit.png";
import checkboxImg from "@assets/images/checkbox-fill.png";

interface MenuActionsProps {
  onEdit: () => void;
  onComplete: () => void;
  onDelete: () => void;
}
export function MenuActions({
  onEdit,
  onComplete,
  onDelete,
}: MenuActionsProps) {
  const [visible, setVisible] = useState(false);

  function hideMenu() {
    setVisible(false);
  }
  function showMenu() {
    setVisible(true);
  }

  function handleOpenMenu() {
    setVisible(true);
  }
  function handleEditTask() {
    onEdit();
    hideMenu();
  }
  function handleDeleteTask() {
    onDelete();
    hideMenu();
  }
  function handleCompleteTask() {
    onComplete();
    hideMenu();
  }
  return (
    <>
      <Menu
        style={styles.shadow}
        visible={visible}
        anchor={
          <DotsButtonContainer onPress={handleOpenMenu}>
            <DotsIcon />
          </DotsButtonContainer>
        }
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={handleEditTask}>
          <MenuItemContainer>
            <Image source={editImg} />
            <Text
              size="MD"
              color="GRAY_500"
              fontFamily="secondary"
              weight="bold"
            >
              Editar
            </Text>
          </MenuItemContainer>
        </MenuItem>
        <MenuItem onPress={handleCompleteTask}>
          <MenuItemContainer>
            <Image source={checkboxImg} />
            <Text
              size="MD"
              color="GREEN_600"
              fontFamily="secondary"
              weight="bold"
            >
              Concluir
            </Text>
          </MenuItemContainer>
        </MenuItem>

        <MenuItem onPress={handleDeleteTask}>
          <MenuItemContainer>
            <Image source={deleteImg} />
            <Text
              size="MD"
              color="RED_600"
              fontFamily="secondary"
              weight="bold"
            >
              Deletar
            </Text>
          </MenuItemContainer>
        </MenuItem>
      </Menu>
    </>
  );
}

const styles = StyleSheet.create({
  shadow: {
    elevation: 2,
    shadowRadius: 56,
    shadowColor: "rgba(0,0,0,0.3)",
  },
});

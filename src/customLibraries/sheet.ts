import { EditTaskModal } from "@screens/Home/components/EditTaskModal";
import { CreateTaskModal } from "@screens/Home/components/CreateTaskModal";

import { registerSheet } from "react-native-actions-sheet";

registerSheet("edit-sheet", EditTaskModal);
registerSheet("create-sheet", CreateTaskModal);
export {};

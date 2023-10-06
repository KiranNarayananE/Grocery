import express from "express";
const router = express.Router();
import { getProduct, login,addProduct,deleteProduct ,} from "../controller/admin.js";
import { verifyTokenAdmin } from "../middleware/auth.js";

router.post("/login", login);
router.get("/products", verifyTokenAdmin,getProduct);
router.post("/products", verifyTokenAdmin,addProduct);
router.delete("/products", verifyTokenAdmin,deleteProduct);

export default router;
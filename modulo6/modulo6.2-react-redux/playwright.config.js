import { register } from "esbuild-register/dist/node.js";

register({
  extensions: [".js", ".jsx"],
});

export default {
  testDir: "./tests",
};

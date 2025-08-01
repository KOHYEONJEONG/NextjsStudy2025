import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // 추가
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // 사용하지 않는 변수가 있을 시 경고로 표시
      "@typescript-eslint/no-explicit-any": "warn", //any 타입을 명시적으로 정의할 수 있도록 허용
    },
  },
];

export default eslintConfig;

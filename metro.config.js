const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

//module.exports = withNativeWind(config, { input: "./app/global.css" }); Former Export
module.exports = withNativeWind(
  {
    ...config,
    transformer: {
      ...config.transformer,
      babelTransformerPath: require.resolve("react-native-svg-transformer"), // ✅ Add SVG transformer
    },
    resolver: {
      ...config.resolver,
      assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"), // ✅ Remove SVG from assetExts
      sourceExts: [...config.resolver.sourceExts, "svg"], // ✅ Add SVG to sourceExts
    },
  },
  { input: "./app/global.css" }
);

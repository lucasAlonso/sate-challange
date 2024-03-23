export interface SearchResponse {
  context: Context;
  features: Feature[];
  links: SearchResponseLink[];
  "search:metadata": SearchMetadata;
  stac_extensions: any[];
  stac_version: StacVersion;
  type: string;
}

export interface Context {
  limit: number;
  matched: number;
  returned: number;
}

export interface Feature {
  assets: Assets;
  bbox: number[];
  collection: Collection;
  geometry: Geometry;
  id: string;
  links: FeatureLink[];
  properties: Properties;
  stac_extensions: StacExtension[];
  stac_version: StacVersion;
  type: FeatureType;
}

export interface Assets {
  "ANG.TXT": AngTxt;
  B1: B1;
  B10: B1;
  B11: B1;
  B2: B1;
  B3: B1;
  B4: B1;
  B5: B1;
  B6: B1;
  B7: B1;
  B8: B1;
  B9: B1;
  INDEX: AngTxt;
  "MTL.JSON": AngTxt;
  "MTL.TXT": AngTxt;
  "MTL.XML": AngTxt;
  QA_PIXEL: AngTxt;
  QA_RADSAT: AngTxt;
  REDUCED_RESOLUTION_BROWSE: AngTxt;
  SAA: AngTxt;
  SZA: AngTxt;
  THUMBNAIL: AngTxt;
  VAA: AngTxt;
  VZA: AngTxt;
}

export interface AngTxt {
  bundleable: boolean;
  href: string;
  roles: ANGTXTRole[];
  title: ANGTXTTitle;
  type: ANGTXTType;
}

export enum ANGTXTRole {
  Data = "data",
  Metadata = "metadata",
  Overview = "overview",
  QA = "qa",
  Thumbnail = "thumbnail",
}

export enum ANGTXTTitle {
  AngleCoefficientsFile = "Angle Coefficients File",
  HTMLIndexPage = "HTML index page",
  ProductMetadataFile = "Product Metadata File",
  ProductMetadataFileJSON = "Product Metadata File (json)",
  ProductMetadataFileXML = "Product Metadata File (xml)",
  QualityAssessmentBand = "Quality Assessment Band",
  RadiometricSaturationQualityAssessmentBand = "Radiometric Saturation Quality Assessment Band",
  ReducedResolutionBrowseImage = "Reduced resolution browse image",
  SensorAzimuthAngleBandB4 = "Sensor Azimuth Angle Band (B4)",
  SensorZenithAngleBandB4 = "Sensor Zenith Angle Band (B4)",
  SolarAzimuthAngleBandB4 = "Solar Azimuth Angle Band (B4)",
  SolarZenithAngleBandB4 = "Solar Zenith Angle Band (B4)",
  ThumbnailImage = "Thumbnail image",
}

export enum ANGTXTType {
  ApplicationGeoJSON = "application/geo+json",
  ApplicationJSON = "application/json",
  ApplicationXML = "application/xml",
  ImageJPEG = "image/jpeg",
  ImageTiffApplicationGeotiffProfileCloudOptimized = "image/tiff; application=geotiff; profile=cloud-optimized",
  TextHTML = "text/html",
  TextPlain = "text/plain",
}

export interface B1 {
  bundleable: boolean;
  "eo:bands": EoBand[];
  "eo:common_name": CommonName;
  href: string;
  roles: ANGTXTRole[];
  title: B1Title;
  type: ANGTXTType;
}

export interface EoBand {
  common_name: CommonName;
  name: EoBandName;
}

export enum CommonName {
  Blue = "blue",
  Cirrus = "cirrus",
  Coastal = "coastal",
  Green = "green",
  Lwir11 = "lwir11",
  Lwir12 = "lwir12",
  Nir = "nir",
  Pan = "pan",
  Red = "red",
  Swir16 = "swir16",
  Swir22 = "swir22",
}

export enum EoBandName {
  B1 = "B1",
  B10 = "B10",
  B11 = "B11",
  B2 = "B2",
  B3 = "B3",
  B4 = "B4",
  B5 = "B5",
  B6 = "B6",
  B7 = "B7",
  B8 = "B8",
  B9 = "B9",
}

export enum B1Title {
  BlueBandB2 = "Blue Band (B2)",
  CirrusBandB9 = "Cirrus Band (B9)",
  CoastalAerosolBandB1 = "Coastal/Aerosol Band (B1)",
  GreenBandB3 = "Green Band (B3)",
  NearInfraredBand08B5 = "Near Infrared Band 0.8 (B5)",
  PanchromaticBandB8 = "Panchromatic Band (B8)",
  RedBandB4 = "Red Band (B4)",
  ShortWaveInfraredBand16B6 = "Short-wave Infrared Band 1.6 (B6)",
  ShortWaveInfraredBand22B7 = "Short-wave Infrared Band 2.2 (B7)",
  ThermalInfraredBand109B10 = "Thermal Infrared Band 10.9 (B10)",
  ThermalInfraredBandBand120B11 = "Thermal Infrared Band Band 12.0 (B11)",
}

export enum Collection {
  Landsat8C2L1T1 = "landsat8_c2l1t1",
}

export interface Geometry {
  coordinates: Array<Array<Array<number[]>>>;
  type: GeometryType;
}

export enum GeometryType {
  MultiPolygon = "MultiPolygon",
}

export interface FeatureLink {
  href: string;
  operations?: Operation[];
  rel: Rel;
  title: LinkTitle;
  type: ANGTXTType;
  capabilities?: Capabilities;
}

export interface Capabilities {
  parameters: Parameter[];
}

export interface Parameter {
  name: ParameterName;
  values: Value[];
}

export enum ParameterName {
  Composite = "composite",
}

export interface Value {
  description: string;
  name: ValueName;
  title: ValueTitle;
}

export enum ValueName {
  Agriculture = "agriculture",
  Bathymetric = "bathymetric",
  ColorInfraredVeg1 = "color_infrared_veg1",
  ColorInfraredVeg2 = "color_infrared_veg2",
  Default = "default",
  Evi2 = "evi2",
  FalseColorUrban = "false_color_urban",
  Geology = "geology",
  Ndmi = "ndmi",
  Ndvi = "ndvi",
  Ndwi = "ndwi",
  Ndwi2 = "ndwi2",
  Nri = "nri",
  Swir2 = "swir2",
  TrueColor = "true_color",
}

export enum ValueTitle {
  Agriculture = "Agriculture",
  Bathymetric = "Bathymetric",
  ColorInfraredVegetation2NGB = "Color Infrared Vegetation 2 (NGB)",
  ColorInfraredVegetationNRG = "Color Infrared Vegetation (NRG)",
  DefaultView = "Default View",
  EnhancedVegitativeIndex2EVI2 = "Enhanced Vegitative Index 2 (EVI2)",
  FalseColorUrban = "False Color (Urban)",
  Geology = "Geology",
  NDWIGreenNIR = "NDWI (Green & NIR)",
  Ndvi = "NDVI",
  NdwiNirSwir = "NDWI (NIR & SWIR)",
  NitrogenReflectanceIndexNRI = "Nitrogen Reflectance Index (NRI)",
  NormalizedDifferenceMoistureIndexHDMI = "Normalized Difference Moisture Index (HDMI)",
  Swir2 = "SWIR 2",
  TrueColorComposite = "True Color Composite",
}

export enum Operation {
  Get = "get",
}

export enum Rel {
  Collection = "collection",
  Leaflet = "leaflet",
  License = "license",
  Maplayer = "maplayer",
  MaplayerZxy = "maplayer-zxy",
  Parent = "parent",
  Preview = "preview",
  Root = "root",
  Self = "self",
  Statistics = "statistics",
  Tileinfo = "tileinfo",
}

export enum LinkTitle {
  Collection = "Collection",
  License = "License",
  MapLayerMetadata = "Map Layer Metadata",
  MinimalLeafletViewer = "Minimal Leaflet Viewer",
  Parent = "Parent",
  PreviewImage = "Preview Image",
  Root = "Root",
  SceneLevelStatistics = "Scene-level Statistics",
  Self = "Self",
  TMSMapLayerWithRatio = "TMS Map Layer with Ratio",
  TMSMapLayerWithoutRatio = "TMS Map Layer without Ratio",
}

export interface Properties {
  "aac:collection_attribution": Attribution;
  "aac:collection_display_name": AACCollectionDisplayName;
  "aac:collection_family_display_name": AACCollectionFamilyDisplayName;
  "aac:item_attribution": Attribution;
  "aac:item_family": Collection;
  constellation: Constellation;
  created: Date;
  datetime: Date;
  "eo:constellation": Constellation;
  license: License;
  providers: Provider[];
}

export enum Attribution {
  USGSNASALandsat = "USGS/NASA Landsat",
}

export enum AACCollectionDisplayName {
  Landsat8Level1 = "Landsat 8 Level 1",
}

export enum AACCollectionFamilyDisplayName {
  Landsat8 = "Landsat 8",
}

export enum Constellation {
  Landsat8 = "landsat-8",
}

export enum License {
  Pddl10 = "PDDL-1.0",
}

export interface Provider {
  attribution: Attribution;
  name: ProviderName;
  roles: ProviderRole[];
  url: string;
}

export enum ProviderName {
  Usgs = "USGS",
}

export enum ProviderRole {
  Licensor = "licensor",
  Producer = "producer",
}

export enum StacExtension {
  AAC = "aac",
}

export enum StacVersion {
  The100Beta2 = "1.0.0-beta.2",
}

export enum FeatureType {
  Feature = "Feature",
}

export interface SearchResponseLink {
  body: Body;
  href: string;
  merge: boolean;
  method: string;
  rel: string;
  title: string;
  type: ANGTXTType;
}

export interface Body {
  next: string;
}

export interface SearchMetadata {
  limit: number;
  next: string;
  numberMatched: number;
  numberReturned: number;
}

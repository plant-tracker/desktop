# desktop

## Install React Native for Windows
This project uses React Native for Windows to desktop app

To create a project directory, run this command in the root folder:
```shell
npx react-native init PlantTracker
```
Copy all project files to this newly created directory

## Navigate into this newly created directory
Once the project has been initialized, move to freshly created directory
```shell
cd PlantTracker
```

## Install the Windows extension
Install the React Native for Windows packages.
```shell
npx react-native-windows-init --overwrite
```

## Install a component React Native Picker
Run this command in project directory
```shell
npm install @react-native-picker/picker
```

## React Native Picker Usage
Usage in Windows without autolinking requires the following extra steps:

### Add the ReactNativePicker project to your solution.
Open the main application solution in Visual Studio 2019
Right-click Solution icon in Solution Explorer > Add > Existing Project Select ...\PlantTracker\node_modules\@react-native-picker\picker\windows\ReactNativePicker\ReactNativePicker.vcxproj

### Adding reference to ReactNativePicker to PlantTracker/windows/PlantTracker.sln
Add a reference to ReactNativePicker to main application project. From Visual Studio 2019:
Right-click main application project > Add > Reference... Check ReactNativePicker from Solution Projects.

### PlantTracker/windows/PlantTracker/app.cpp
Add #include "winrt/ReactNativePicker.h" to the headers included at the top of the file.

Add PackageProviders().Append(winrt::ReactNativePicker::ReactPackageProvider()); before InitializeComponent();.

## Changing WindowsTargetPlatformVersion
Probably the app will require fix with WindowsTargetPlatform. Edit node_modules\@react-native-picker\picker\windows\ReactNativePicker\ReactNativePicker.vcxproj and change WindowsTargetPlatformVersion to your Windows SDK version. Open Main app and React Native Picker solutions, right-click on these projects and choose change WindowsTargetPlatformVersion. Change their versions to these required by app.

## Fix Microsoft.UI.Xaml for React Native Picker
Probably the app will require Microsoft.UI.Xaml 2.70 version. Open React Native Picker solution in visual studio 2019, right-click on it, choose manage NuGet Package and change its version Microsoft.UI.Xaml to 2.7.0 

## run the following command to install the latest SDK
npm install firebase

## Usage
```shell
run npm run windows
```
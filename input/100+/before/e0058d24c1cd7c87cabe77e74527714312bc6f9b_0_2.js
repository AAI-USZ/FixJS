function AddConfigurations(proj, strProjectName) {

    try {

        var nCntr;

        for (nCntr = 0; nCntr < nNumConfigs; nCntr++) {

            // Check if it's Debug configuration

            var bDebug = false;

            if (astrConfigName[nCntr].search("Debug") != -1)

                bDebug = true;



            // General settings

            var config = proj.Object.Configurations(astrConfigName[nCntr]);



            //             if(wizard.FindSymbol("CC_USE_UNICODE"))

            config.CharacterSet = charSetUnicode;

            //             else

            //                config.CharacterSet = charSetMBCS;



            var WizardVersion = wizard.FindSymbol('WIZARD_VERSION'); 

            if(WizardVersion >= 10.0) {

                config.OutputDirectory = '$(SolutionDir)$(Configuration).win32\\'

                config.IntermediateDirectory = '$(Configuration).win32\\';

            } else {

                config.OutputDirectory = '$(SolutionDir)$(ConfigurationName).win32'

                config.IntermediateDirectory = '$(ConfigurationName).win32';

            }



            // Compiler settings

            var CLTool = config.Tools('VCCLCompilerTool');



            // Additional Inlcude Directories

            var strAddIncludeDir = '.;..\\Classes';

            strAddIncludeDir += ';..\\..\\cocos2dx';

            strAddIncludeDir += ';..\\..\\cocos2dx\\include';

            strAddIncludeDir += ';..\\..\\cocos2dx\\kazmath\\include';

            strAddIncludeDir += ';..\\..\\cocos2dx\\platform\\win32';

            strAddIncludeDir += ';..\\..\\cocos2dx\\platform\\third_party\\win32';

            strAddIncludeDir += ';..\\..\\cocos2dx\\platform\\third_party\\win32\\OGLES';

            

            if (wizard.FindSymbol('CC_USE_BOX2D')) {

                strAddIncludeDir += ';..\\..\\';

            }

            if (wizard.FindSymbol('CC_USE_CHIPMUNK')) {

                strAddIncludeDir += ';..\\..\\chipmunk\\include\\chipmunk';

            }

            if (wizard.FindSymbol('CC_USE_COCOS_DENSHION_SIMPLE_AUDIO_ENGINE')) {

                strAddIncludeDir += ';..\\..\\CocosDenshion\\Include';

            }

            if (wizard.FindSymbol('CC_USE_LUA')) {

                strAddIncludeDir += ';..\\..\\lua\\cocos2dx_support';

                strAddIncludeDir += ';..\\..\\lua\\tolua';

                strAddIncludeDir += ';..\\..\\lua\\lua';

            }

            CLTool.AdditionalIncludeDirectories = strAddIncludeDir;



            CLTool.UsePrecompiledHeader = pchNone;  // pchUseUsingSpecific;

            CLTool.WarningLevel = warningLevel_3;

            if (bDebug) {

                CLTool.RuntimeLibrary = rtMultiThreadedDebugDLL;

                CLTool.MinimalRebuild = true;

                CLTool.DebugInformationFormat = debugEditAndContinue;

                CLTool.BasicRuntimeChecks = runtimeBasicCheckAll;

                CLTool.Optimization = optimizeDisabled;

            }

            else {

                CLTool.RuntimeLibrary = rtMultiThreadedDLL;

                CLTool.ExceptionHandling = false;

                CLTool.DebugInformationFormat = debugDisabled;

            }



            var strDefines = GetPlatformDefine(config);

            strDefines += "_WINDOWS;STRICT;_CRT_SECURE_NO_WARNINGS;_SCL_SECURE_NO_WARNINGS";

            if (bDebug)

                strDefines += "_DEBUG;COCOS2D_DEBUG=1;";

            else

                strDefines += "NDEBUG";

            CLTool.PreprocessorDefinitions = strDefines;



            // Disable special warning

            CLTool.DisableSpecificWarnings = "4267;4251;4244";



            // Linker settings

            var LinkTool = config.Tools('VCLinkerTool');

            LinkTool.SubSystem = subSystemWindows;

            LinkTool.TargetMachine = machineX86;

            if (bDebug) {

                LinkTool.LinkIncremental = linkIncrementalYes;

                LinkTool.GenerateDebugInformation = true;

            }

            else {

                LinkTool.LinkIncremental = linkIncrementalNo;

            }



            // Additional Library Directories

            var strAddDepends = 'libcocos2d.lib opengl32.lib glew32.lib';

            if (wizard.FindSymbol('CC_USE_BOX2D')) {

                strAddDepends += ' libBox2d.lib';

            }

            if (wizard.FindSymbol('CC_USE_CHIPMUNK')) {

                strAddDepends += ' libchipmunk.lib';

            }

            if (wizard.FindSymbol('CC_USE_COCOS_DENSHION_SIMPLE_AUDIO_ENGINE')) {

                strAddDepends += ' libCocosDenshion.lib';

            }

            if (wizard.FindSymbol('CC_USE_LUA')) {

                strAddDepends += ' liblua.lib';

            }

            LinkTool.AdditionalLibraryDirectories = '$(OutDir)';

            LinkTool.AdditionalDependencies = strAddDepends;



            // Resource settings

            var RCTool = config.Tools("VCResourceCompilerTool");

            RCTool.Culture = rcEnglishUS;

            RCTool.AdditionalIncludeDirectories = "$(IntDir)";

            if (bDebug)

                RCTool.PreprocessorDefinitions = "_DEBUG";

            else

                RCTool.PreprocessorDefinitions = "NDEBUG";



            // MIDL settings

            var MidlTool = config.Tools("VCMidlTool");

            MidlTool.MkTypLibCompatible = false;

            if (IsPlatformWin32(config))

                MidlTool.TargetEnvironment = midlTargetWin32;

            if (bDebug)

                MidlTool.PreprocessorDefinitions = "_DEBUG";

            else

                MidlTool.PreprocessorDefinitions = "NDEBUG";

            MidlTool.HeaderFileName = strProjectName + ".h";

            MidlTool.InterfaceIdentifierFileName = strProjectName + "_i.c";

            MidlTool.ProxyFileName = strProjectName + "_p.c";

            MidlTool.GenerateStublessProxies = true;

            MidlTool.TypeLibraryName = "$(IntDir)/" + strProjectName + ".tlb";

            MidlTool.DLLDataFileName = "";



            // Post-build settings

//            var PostBuildTool = config.Tools("VCPostBuildEventTool");

//            PostBuildTool.Description = "Performing copy resource from Resource to OutDir...";

//            PostBuildTool.CommandLine = "xcopy /E /Q /Y \"$(ProjectDir)Resource\\*.*\" \"$(OutDir)\"";

        }

    }

    catch (e) {

        throw e;

    }

}
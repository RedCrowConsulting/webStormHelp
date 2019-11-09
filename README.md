webStormHelp
This is a skeleton work in progress all rights reserved and is shared only for help configuring WebStorm IDE. Thank you kindly as I am working mostly by myself on the coding.

There's a lot going on here. As this is my first starter kit and I am switching from Atom to WebStorm,
I need help configuring the run configuration in the case of my dev and production local environments. However, one builds into memory with source maps.

To test what's here:
 - clone the repo and destroy it after you are done
 - Run npm i in the project directory
 
 - The script notes in the package.json script read as follows and we only care about the start and run build
 
 ```  
  "scripts": {
    "//": [
      "npm start -s FOR development,",  
      "npm run build -s FOR dist folder refresh & to serve production locally",  
      "NOT READY npm run deploy -s FOR surge",  
      "npm run share -s for a localtunnel session",  
      "for localtunnel avoid --subdomain name (as they fail more often)"  
    ]  
 
 ```  
    
# Requested run configuration
Latest chrome browser. I was using 
**WebStorm 2019.2.4**  
    Build #WS-192.7142.35, built on October 28, 2019  
    Licensed to WebStorm Evaluator  
    Expiration date: November 21, 2019  
    Runtime version: 11.0.4+10-b304.77 x86_64  
    VM: OpenJDK 64-Bit Server VM by JetBrains s.r.o  
    macOS 10.14.6  
    GC: ParNew, ConcurrentMarkSweep  
    Memory: 2014M  
    Cores: 4  
    Registry: ide.mac.allowDarkWindowDecorations=true, ide.tree.ui.experimental=false, ide.balloon.shadow.size=0  
    Non-Bundled Plugins: com.chrisrm.idea.MaterialThemeUI, mobi.hsz.idea.gitignore, com.vladsch.idea.multimarkdown, zielu.gittoolbox  

Now, using this version of WebStorm,
**WebStorm 2019.3 EAP**
Build #WS-193.5096.13, built on November 6, 2019
WebStorm EAP User
Expiration date: December 6, 2019
Runtime version: 11.0.4+10-b520.5 x86_64
VM: OpenJDK 64-Bit Server VM by JetBrains s.r.o
macOS 10.14.6
GC: ParNew, ConcurrentMarkSweep
Memory: 2014M
Cores: 4
Registry: ide.tree.ui.experimental=false, ide.balloon.shadow.size=0
Non-Bundled Plugins: com.chrisrm.idea.MaterialThemeUI

**Hardware Overview:**
  Model Name:	iMac  
  Model Identifier:	iMac17,1  
  Processor Name:	Intel Core i5  
  Processor Speed:	3.2 GHz  
  Number of Processors:	1  
  Total Number of Cores:	4  
  L2 Cache (per Core):	256 KB  
  L3 Cache:	6 MB  
  Memory:	24 GB  
  Boot ROM Version:	170.0.0.0.0  
  SMC Version (system):	2.33f10  
  
  I also run in a Chroot on an older Chromebook in developer mode with Ubuntu Linux.
  
## npm start -s For Development
Builds into memory with source maps that are visible when you open dev tools.

## npm run build -s For dist folder refresh
Rebuilds the files in the dist folder and serves production locally

## Please disregard deploy and share

# Comments
Thanks for your time. I like your product but need to understand it's debug config in my case.

First, note there are two webpack config files:
 - webpack.config.dev.js
 - webpack.config.prod.js

The top of the index.ejs explains that that file is a template for index.html. It uses ejs and htmlWebpackPlugin to generate a different index.html for each environment. htmlWebpackPlugin will dynamicallly add references to the scripts and styles that it bundles to this file. The generated bundles have hash-based filenames, so it's necessary to add the references dynamicallly. For more info on ejs, see https://ejs.co/  

For examples of using it with htmlWebpackPlugin, see https://github.com/jaketrent/html-webpack-template/blob/master/index.ejs Make sure your editor treats .ejs files properly for highlighting  

# Diagram of what the build scripts are doing

![Starter Kit Script Flow](https://user-images.githubusercontent.com/21182598/68532063-f420b180-02de-11ea-9997-67f07e587030.png)




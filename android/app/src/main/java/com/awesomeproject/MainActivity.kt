package com.awesomeproject

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen  // Import SplashScreen

class MainActivity : ReactActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        SplashScreen.show(this)  // Show splash screen
        super.onCreate(savedInstanceState)
    }

    override fun getMainComponentName(): String = "AwesomeProject"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}

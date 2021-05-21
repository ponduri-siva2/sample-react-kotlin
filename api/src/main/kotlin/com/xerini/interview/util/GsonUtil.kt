package com.xerini.interview.util

import com.google.gson.Gson
import com.google.gson.GsonBuilder

object GsonUtil {
    val gson: Gson = GsonBuilder()
            .create()
}
module Main where

import Debug.Trace

-- Import the library's module(s)
import Viz.Container

-- Import Test.QuickCheck, which supports property-based testing
import Test.QuickCheck

-- Main.main is the entry point of the application
--
-- In the case of the test suite, Main.main will use QuickCheck to test a collection
-- of properties that we expect of the diffs function.

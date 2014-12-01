module Main where

import Debug.Trace

-- Import the library's module(s)
import GCD.Main

-- Import Test.QuickCheck, which supports property-based testing
import Test.QuickCheck

-- Main.main is the entry point of the application
--
-- In the case of the test suite, Main.main will use QuickCheck to test
-- a bunch of inputs to our GCD function
main = do

  trace "m and n are equal & > 0: GCD(m, n) => m"
  quickCheck' 1 $ gcd 14 14 == 14

  trace "m > n: GCD(468, 24) should be 12"
  quickCheck' 1 $ gcd 468 24 == 12

  trace "n > m: GCD(24, 468) should be 12"
  quickCheck' 1 $ gcd 24 468 == 12

  trace "m = 0, n = 45: GCD(0, 45) should be 45"
  quickCheck' 1 $ gcd 0 45 == 45

  trace "n < 0, m = 34: GCD(34, -5) should be 1"
  quickCheck' 1 $ gcd 34 (-5) == 1

  trace "m & n < 0: GCD(-27239, -2302940) should be 1"
  quickCheck' 1 $ gcd (-27239) (-2302940) == 1

  trace "m & n = 0: GCD(0, 0) should be zero"
  quickCheck' 1 $ gcd 0 0 == 0

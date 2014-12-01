module GCD.Main where

import Math
import Debug.Trace
-- This module defines some tests for a gcd function
-- Reasons for picking GCD
--	1. Picking up purescript and quickcheck for the first time, needed a small mathematical problem
--	2. Decided to solve it in purescript directly, since it is elegant & efficient to implement recursion

gcd :: Number -> Number -> Number
gcd 0 0 = 0
gcd m 0 = m
gcd 0 n = n
gcd m n = if mABS > nABS then gcd (mABS-nABS) nABS else gcd mABS (nABS-mABS)
  where
  mABS = Math.abs(m)
  nABS = Math.abs(n)

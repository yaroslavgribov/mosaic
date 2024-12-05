module CeresSearch exposing (main)
import Dict exposing (Dict)
import Html
import Puzzle04

main = Html.text (solver Puzzle04.puzzle_input)

type alias Coordinate = (Int, Int)
type alias Matrix = Dict Coordinate Char

-- Convert string to matrix
stringToMatrix : String -> Matrix
stringToMatrix input =
    input
        |> String.lines
        -- Convert each line into a list of tuples with coordinates and values
        |> List.indexedMap (\y line ->
            String.toList line
                |> List.indexedMap (\x char ->
                    ((x, y), char)
                )
        )
        |> List.concat
        |> Dict.fromList

-- We'll need all eight directions we can move in
directions : List (Int, Int)
directions =
    [ (-1, -1), (0, -1), (1, -1)  -- northwest, north, northeast
    , (-1,  0),          (1,  0)  -- west, east
    , (-1,  1), (0,  1), (1,  1)  -- southwest, south, southeast
    ]

-- Given a starting point and a direction, collect characters
-- we find in that direction (including our starting point)
collectInDirection : Matrix -> Coordinate -> (Int, Int) -> String
collectInDirection matrix (x, y) (dx, dy) =
    let
        -- Get positions three steps out from our start
        positions =
            [ (x, y)                     -- start
            , (x + dx, y + dy)           -- one step
            , (x + dx*2, y + dy*2)       -- two steps
            , (x + dx*3, y + dy*3)       -- two steps
            ]
    in
    positions
        |> List.filterMap (\pos -> Dict.get pos matrix)
        |> String.fromList

findSequences : String -> Int
findSequences input =
    let
        matrix = stringToMatrix input

        -- When we find a 'X', check all eight directions
        checkFromPosition : Coordinate -> Int -> Int
        checkFromPosition coord count =
            case Dict.get coord matrix of
                Just 'X' ->
                    -- For each direction, collect three characters
                    -- and check if they form our sequence
                    directions
                        |> List.map (collectInDirection matrix coord)
                        |> List.filter ((==) "XMAS")
                        |> List.length
                        |> (+) count

                _ ->
                    count
    in
    -- Check every position in our matrix
    Dict.keys matrix
        |> List.foldl checkFromPosition 0

type alias X = Int
type alias Y = Int
-- These represent the critical positions we need to check for each pattern
type alias PatternCheck =
    { mPositions : List (X, Y)  -- where M's should be
    , sPositions : List (X, Y)  -- where S's should be
    }

-- Define our valid patterns in terms of where M's and S's must appear
validPatterns : List PatternCheck
validPatterns =
    [ PatternCheck [(-1, -1), (-1, 1)] [(1, -1), (1, 1)]    -- M's left, S's right
    , PatternCheck [(-1, -1), (1, -1)] [(-1, 1), (1, 1)]    -- M's top, S's bottom
    , PatternCheck [(-1, 1), (1, 1)] [(-1, -1), (1, -1)]    -- M's bottom, S's top
    , PatternCheck [(1, -1), (1, 1)] [(-1, -1), (-1, 1)]    -- M's right S's left
    ]

-- Check if a position relative to center matches expected character
checkPosition : Matrix -> Coordinate -> Char -> (Int, Int) -> Bool
checkPosition matrix (centerX, centerY) expectedChar (dx, dy) =
    case Dict.get (centerX + dx, centerY + dy) matrix of
        Just char ->
            -- Position must contain expected char
            char == expectedChar
        Nothing ->
            False

-- Check if a pattern matches at a given center position
matchesPattern : Matrix -> Coordinate -> PatternCheck -> Bool
matchesPattern matrix center pattern =
    let
        -- All M positions must have M's
        mMatches = List.all (checkPosition matrix center 'M') pattern.mPositions
        -- All S positions must have S's
        sMatches = List.all (checkPosition matrix center 'S') pattern.sPositions
    in
    mMatches && sMatches

findPatterns : String -> Int
findPatterns input =
    let
        matrix = stringToMatrix input

        checkFromA : Coordinate -> Int -> Int
        checkFromA coord count =
            case Dict.get coord matrix of
                Just 'A' ->
                    -- Count how many patterns match at this A
                    validPatterns
                        |> List.filter (matchesPattern matrix coord)
                        |> List.length
                        |> (+) count
                _ ->
                    count
    in
    Dict.keys matrix
        |> List.foldl checkFromA 0

solver : String -> String
solver input =
    let
        sequences = Debug.toString (findSequences input)
        patterns = Debug.toString (findPatterns input)
    in
        "Part 1: " ++ sequences ++ " Part 2: " ++ patterns

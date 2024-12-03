module MullItOver exposing (main)

import Html
import Puzzle03
import Parser exposing (..)
import Set

main = Html.text (solver Puzzle03.puzzle_input)

solver input =
    parseSections input |> parse |> List.map(\(a, b) -> a * b) |> List.sum |> Debug.toString

parse : String -> List (Int, Int)
parse input =
    case Parser.run expressionsParser input of
        Ok results -> results
        Err _ -> []

-- Our main parser for multiple expressions
expressionsParser : Parser (List (Int, Int))
expressionsParser =
    -- loop starts with an empty list and uses our helper function
    loop [] expressionsHelp

-- Helper function that builds our list of results
expressionsHelp : List (Int, Int) -> Parser (Step (List (Int, Int)) (List (Int, Int)))
expressionsHelp revResults =
    oneOf
        [ -- Try to parse one expression and continue
          backtrackable (succeed Tuple.pair
            |. symbol "mul"
            |. symbol "("
            |= int
            |. symbol ","
            |= int
            |. symbol ")"
            )
            |> map (\result -> Loop (result :: revResults))
        , -- If we're at the end, we're done
          end |> map (\_ -> Done (List.reverse revResults))
        , -- Skip one character and continue
          chompIf (\_ -> True)
            |> map (\_ -> Loop revResults)
        ]

parseSections : String -> String
parseSections input =
    case run sectionsParser input of
        Ok results -> List.foldl (\a acc -> acc ++ a) "" results
        Err _ -> ""

sectionsParser : Parser (List String)
sectionsParser =
    -- We use a loop with both the accumulated results and a flag indicating if we're collecting
    loop ([], True) sectionsHelp

-- Our helper now needs to track both the results and whether we're currently collecting text
sectionsHelp : (List String, Bool) -> Parser (Step (List String, Bool) (List String))
sectionsHelp (revResults, isCollecting) =
    oneOf
    [ -- Find "do()" pattern
        backtrackable(
            succeed identity
                |. symbol "do"
                |. symbol "("
                |. symbol ")"
        )
        |> map (\_ -> Loop (revResults, True))

        -- Find "don't()" pattern
        , backtrackable(
                succeed identity
                    |. symbol "don't"
                    |. symbol "("
                    |. symbol ")"
            )
            |> map (\_ -> Loop (revResults, False))

        -- Handle end of input
        , end
            |> map (\_ -> Done (List.reverse revResults))

        -- Handle any other character
        , succeed ()
            |. chompIf (\_ -> True)
            |> getChompedString
            |> map (\char ->
                if isCollecting then
                    -- If we're collecting, append to current result
                    case revResults of
                        current :: rest ->
                            Loop (String.append current char :: rest, True)
                        [] ->
                            Loop ([char], True)
                else
                    -- If not collecting, just continue
                    Loop (revResults, False)
            )
        ]

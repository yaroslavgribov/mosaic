
module Day02 exposing (main)
import Puzzle02
import Browser
import Html
import List
import Tuple
-- MAIN
main = Html.text (solver Puzzle02.puzzle_input)

parser s =
        String.trim s
        |> String.lines
        |> List.map String.words

safe : List Int -> Bool
safe list =
    let
        pairs = List.map2 Tuple.pair list (List.drop 1 list)
        differences = List.map (\(a, b) -> a - b) pairs
        monotonic = List.all (\x -> x > 0) differences || List.all (\x -> x < 0) differences
        in_range = List.all(\x -> abs x <= 3) differences
    in
        monotonic && in_range

inits : List a -> List (List a)
inits list =
    List.range 0 (List.length list)
        |> List.map (\n -> List.take n list)

tails : List a -> List (List a)
tails list =
    List.range 0 (List.length list)
        |> List.map (\n -> List.drop n list)

tolerated : List Int -> Bool
tolerated lst =
    let
        lsts = List.map2 (\init tail ->
                init ++ (Maybe.withDefault [] (List.tail tail))
            )
            (inits lst)
            (tails lst)
    in
        List.any safe lsts
solver : String -> String
solver input =
    let
        reports = parser input |> List.map (List.filterMap String.toInt)
        part1 = List.filter safe reports |> List.length
        part2 = List.filter tolerated reports |> List.length
    in
        String.fromInt part1 ++ ", " ++ String.fromInt part2
        |> Debug.toString

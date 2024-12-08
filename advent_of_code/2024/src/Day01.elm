module Day01 exposing (main)
import Puzzle01
import Browser
import Html
import List
-- MAIN
main = Html.text (solver Puzzle01.puzzle_input)

parser : String -> List (List String)
parser s =
        String.trim s
        |> String.lines
        |> List.map String.words

combiner : String -> (List String, List String)
combiner lst =
    let
        pairs = parser(lst)
        (first_distances, second_distances) = List.foldl (\pair (firsts, seconds) ->
            case pair of
                [x, y] -> (x :: firsts, y :: seconds)
                _ -> (firsts, seconds)
                ) ([], []) pairs

        sorted_firsts = List.sort first_distances
        sorted_seconds = List.sort second_distances
    in
        (sorted_firsts, sorted_seconds)

solver : String -> String
solver lst =
    let
        (sorted_firsts, sorted_seconds) = combiner lst
        -- differences = List.map2 (\x y -> case (String.toInt x, String.toInt y) of
                --     (Just f, Just s) ->
                --         abs (f - s)
                --     _ -> 0) sorted_firsts sorted_seconds
        similarities = List.map (\x ->
            List.length (List.filter(\y -> x == y) sorted_seconds) * case String.toInt x of
                    Just score -> score
                    _ -> 0
            ) sorted_firsts
    in
        -- differences
        similarities
        |> List.foldl (+) 0
        |> Debug.toString

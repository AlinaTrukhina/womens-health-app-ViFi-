import { Box, Button, Container, FormControlLabel, InputLabel, Menu, MenuItem, Pagination, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Feedback() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [questions, setQuestions] =
        useState([
            'What was the MOST helpful feature of this website?',
            'What was the LEAST helpful feature of this website?',
            'How do you currently get your healthcare information?',
            'What is the most confusing aspect of managing your healthcare?',
        ])

    const [[dropdownA, setDropA], [dropdownB, setDropB], [multi, setMulti]] =
        [
            useState([
                'Age-related screening recommendation',
                'Testing explanation',
                'Questions to ask my provider',
                'Resources for further info',
                'List of virtual care providers'
            ]), useState([
                'Provider/healthcare visit',
                'Call my healthcare provider',
                'Online search',
                'Friends/Family'
            ]), useState([
                'Finding a provider',
                'Knowing what I should be monitoring/managing',
                'Knowing what to ask my provider',
                'Navigating insurance',
                'Understanding how to shop for healthcare services',
                'Managing my health records'
            ])
        ]

    const [answers, setAnswers] = useState({ '1': 'N/A', '2': 'N/A', '3': 'N/A', '4': 'N/A',
                                             '5': 'N/A', '6': 'N/A', '7': 'N/A', '8': 'N/A', '9': 'N/A' });

    const [[page, setPage],
        [radio, setRadio],
        [comment, setComment],
        [rating, setRating]
    ] = [useState(1), useState(1), useState(''), useState(0)];

    const saveAnswer = (answer) => {
        setAnswers({ ...answers, ...answer });
    }

    const changePage = (update) => {
        if (page + update > 0 && page + update < 11) {
            setRadio(0);
            setPage(page + update);
        }
    }

    const setRadioAnswer = (e) => {
        switch (page) {
            case 4: setAnswers({ ...answers, '4': e.target.value }); break;
            case 5: setAnswers({ ...answers, '5': e.target.value }); break;
            case 6: setAnswers({ ...answers, '6': e.target.value }); break;
            case 7: setAnswers({ ...answers, '7': e.target.value }); break;
            case 8: setAnswers({ ...answers, '8': e.target.value }); break;
            case 9: setAnswers({ ...answers, '9': e.target.value }); break;
            default: null;
        }
        setRadio(e.target.value);
    }

    const submitSurvey = () => {
        dispatch({
            type: 'SUBMIT_SURVEY', payload: {
                answers: { ...answers },
                questions: [questions[0], questions[1], questions[2], ...multi],
                comment: comment,
                rating: rating
            }
        })
        history.push('/home');
    }

    // console.log(answers);

    return (
        <Container>
            <Typography variant="h4" textAlign={'center'}>Thank you for using the ViFi!</Typography>
            <Typography paragraph textAlign={'center'}>
                Please answer some questions
                so we may better serve you next time.
            </Typography>
            {page == 1 &&
                <Box>
                    <InputLabel id='feedbackQ1' sx={({ 'fontSize': '12px' })}>{questions[0]}</InputLabel>
                    <Select labelId="feedbackQ1" value={answers['1']} onChange={(e) => saveAnswer({ '1': e.target.value })}>
                        <MenuItem value={dropdownA[0]}>{dropdownA[0]}</MenuItem>
                        <MenuItem value={dropdownA[1]}>{dropdownA[1]}</MenuItem>
                        <MenuItem value={dropdownA[2]}>{dropdownA[2]}</MenuItem>
                        <MenuItem value={dropdownA[3]}>{dropdownA[3]}</MenuItem>
                        <MenuItem value={dropdownA[4]}>{dropdownA[4]}</MenuItem>
                    </Select>
                </Box>
            }
            {page == 2 &&
                <Box>
                    <InputLabel id='feedbackQ2' sx={({ 'fontSize': '12px' })}>{questions[1]}</InputLabel>
                    <Select labelId="feedbackQ2" value={answers['2']} onChange={(e) => saveAnswer({ '2': e.target.value })}>
                        <MenuItem value={dropdownA[0]}>{dropdownA[0]}</MenuItem>
                        <MenuItem value={dropdownA[1]}>{dropdownA[1]}</MenuItem>
                        <MenuItem value={dropdownA[2]}>{dropdownA[2]}</MenuItem>
                        <MenuItem value={dropdownA[3]}>{dropdownA[3]}</MenuItem>
                        <MenuItem value={dropdownA[4]}>{dropdownA[4]}</MenuItem>
                    </Select>
                </Box>
            }
            {page == 3 &&
                <Box>
                    <InputLabel id='feedbackQ3' sx={({ 'fontSize': '12px' })}>{questions[2]}</InputLabel>
                    <Select labelId="feedbackQ3" value={answers['3']} onChange={(e) => saveAnswer({ '3': e.target.value })}>
                        <MenuItem value={dropdownB[0]}>{dropdownB[0]}</MenuItem>
                        <MenuItem value={dropdownB[1]}>{dropdownB[1]}</MenuItem>
                        <MenuItem value={dropdownB[2]}>{dropdownB[2]}</MenuItem>
                        <MenuItem value={dropdownB[3]}>{dropdownB[3]}</MenuItem>
                    </Select>
                </Box>
            }
            {page > 3 && page < 10 &&
                <Box>
                    <Typography paragraph>{questions[3]}</Typography>
                    <Typography paragraph>Please rate from 1 (least confusing) to 5 (most confusing)</Typography>
                    <Typography paragraph textAlign={'center'} border={'1px solid black'}>{multi[page - 4]}</Typography>
                    <Box>
                        <RadioGroup row sx={({ 'justifyContent': 'space-evenly' })} onChange={(e) => setRadioAnswer(e)} value={radio}>
                            <FormControlLabel value={'1'} control={<Radio />} label='1' labelPlacement="top" sx={({ 'margin': 0 })} />
                            <FormControlLabel value={'2'} control={<Radio />} label='2' labelPlacement="top" sx={({ 'margin': 0 })} />
                            <FormControlLabel value={'3'} control={<Radio />} label='3' labelPlacement="top" sx={({ 'margin': 0 })} />
                            <FormControlLabel value={'4'} control={<Radio />} label='4' labelPlacement="top" sx={({ 'margin': 0 })} />
                            <FormControlLabel value={'5'} control={<Radio />} label='5' labelPlacement="top" sx={({ 'margin': 0 })} />
                        </RadioGroup>
                    </Box>
                </Box>
            }
            {page == 10 &&
                <Box>
                    <Typography paragraph>
                        Thank you for completing the survey!

                        Leave a comment and a rating about your overall experience using The Vifi!

                        Submit when you are ready. Thank you yet again!
                    </Typography>
                    <TextField label={'Leave a comment!'} onChange={(e) => setComment(e.target.value)} sx={({ 'width':'100%' })}></TextField>
                    <Box>
                        <InputLabel id="ratingLabel" sx={({ 'fontSize':'12px', 'marginTop':'5%' })}>How do you rate your overall experience?</InputLabel>
                        <Select labelId="ratingLabel" value={rating} onChange={(e) => setRating(e.target.value)}>
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={({ 'textAlign':'center' })}>
                        <Button onClick={() => submitSurvey()} variant='contained'>SUBMIT</Button>
                    </Box>
                </Box>
            }
            <Box sx={({ 'textAlign': 'center', 'paddingTop': '1em', 'paddingBottom': '1em' })}>
                <Button onClick={() => changePage(-1)} variant='outlined' sx={({ 'marginRight': '2em' })}>PREV</Button>
                <Button onClick={() => changePage(1)} variant='outlined' sx={({ 'marginLeft': '2em' })}>NEXT</Button>
            </Box>
            <Box sx={({ 'alignContent':'center' })}>
                <Pagination count={10} page={page} onChange={(e, v) => setPage(v)} hideNextButton hidePrevButton disabled size="large" siblingCount={1}></Pagination>
            </Box>
        </Container>
    )
}

export default Feedback;
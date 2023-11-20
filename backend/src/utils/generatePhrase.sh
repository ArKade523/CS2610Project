# Generate a random phrase from the word file

# Number of lines in the word file
num_lines=$(wc -l < /usr/share/dict/words)

# Generate three random numbers between 1 and the number of lines
rand1=$((RANDOM % num_lines + 1))
rand2=$((RANDOM % num_lines + 1))
rand3=$((RANDOM % num_lines + 1))

# Fetch the words corresponding to those line numbers
word1=$(sed -n "${rand1}p" /usr/share/dict/words)
word2=$(sed -n "${rand2}p" /usr/share/dict/words)
word3=$(sed -n "${rand3}p" /usr/share/dict/words)

# Combine the words using dashes
echo "${word1} ${word2} ${word3}"